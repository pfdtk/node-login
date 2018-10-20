import Controller from './base';
import Oauth2 from '../service/oauth2';
import User from '../service/user';
import { default as ClientRepository } from '../repository/client';
import * as Router from 'koa-router';

interface CredentialsInfo {
    username: string,
    password: string
}

export default class Authorize extends Controller {
    public async index(ctx: Router.IRouterContext): Promise<void> {
        let oauth2Service = new Oauth2(ctx);
        let isValidRequest = await oauth2Service.validateAuthorizationRequest();
        if (isValidRequest) {
            let userService = new User();
            if (!userService.isLogin()) {
                return ctx.response.jsonResult({ status: true, action: 'login' });
            }
            return ctx.response.jsonResult({ status: true, action: 'confirm' });
        }
        return ctx.response.jsonResult({ status: false, action: 'error', error: 'invalid client' });
    }

    public async login(ctx: Router.IRouterContext): Promise<void> {
        let query = ctx.request.query;
        let clientId = query.client_id || '';
        let oauth2Service = new Oauth2(ctx);
        let isValidRequest = await oauth2Service.validateAuthorizationRequest();
        if (!isValidRequest) {
            return ctx.response.jsonResult({ status: false, msg: 'invalid client' });
        }
        let post = <CredentialsInfo>ctx.request.body;
        let userService = new User();
        let user = await userService.getUserIdentity(post.username, post.password);
        if (!user.id) {
            return ctx.response.jsonResult({ status: false, msg: 'invalid credentials' });
        }
        let isLogin = userService.login(user);
        if (!isLogin) {
            return ctx.response.jsonResult({ status: false, msg: 'system error' });
        }
        let clientRepository = new ClientRepository();
        let clientEntity = await clientRepository.getClient(clientId);
        return ctx.response.jsonResult({
            status: true,
            msg: 'success',
            client_id: clientEntity.id,
            client_name: clientEntity.name,
            approval_prompt_auto: true
        });
    }
}