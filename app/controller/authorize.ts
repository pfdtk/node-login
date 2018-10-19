import Controller from './base';
import Oauth2 from '../service/oauth2';
import User from '../service/user';
import { default as ClientRepository } from '../repository/client';

interface CredentialsInfo {
    username: string,
    password: string
}

export default class Authorize extends Controller {
    public async index(): Promise<void> {
        let oauth2Service = new Oauth2(this.ctx);
        let isValidRequest = await oauth2Service.validateAuthorizationRequest();
        if (isValidRequest) {
            let userService = new User();
            if (!userService.isLogin()) {
                return this.responseBody(`login form`);
            }
            return this.responseBody(`confirm form`);
        }
        return this.responseBody(`invalid client`);
    }

    public async login(): Promise<void> {
        let query = this.ctx.request.query;
        let clientId = query.client_id || '';
        let oauth2Service = new Oauth2(this.ctx);
        let isValidRequest = await oauth2Service.validateAuthorizationRequest();
        if (!isValidRequest) {
            return this.responseJsonBody({ status: false, msg: 'invalid client' });
        }
        let post = <CredentialsInfo>this.ctx.request.body;
        let userService = new User();
        let user = await userService.getUserIdentity(post.username, post.password);
        if (!user.id) {
            return this.responseJsonBody({ status: false, msg: 'invalid credentials' });
        }
        let isLogin = userService.login(user);
        if (!isLogin) {
            return this.responseJsonBody({ status: false, msg: 'system error' });
        }
        let clientRepository = new ClientRepository();
        let clientEntity = await clientRepository.getClient(clientId);
        return this.responseJsonBody({
            status: true,
            msg: 'success',
            client_id: clientEntity.id,
            client_name: clientEntity.name,
            approval_prompt_auto: true
        });
    }
}