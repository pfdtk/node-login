import Controller from './base';
import Oauth2 from '../service/oauth2';
import User from '../service/user';

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
        return this.responseJsonBody({ status: true, msg: 'success' });
    }
}