import Controller from './base';
import Oauth2 from '../service/oauth2';
import User from '../service/user';

interface CredentialsInfo {
    username: string,
    password: string
}

export default class Authorize extends Controller {
    public async index(): Promise<string> {
        let oauth2Service = new Oauth2(this.ctx);
        let isValidRequest = await oauth2Service.validateAuthorizationRequest();
        if (isValidRequest) {
            return `login form`;
        }
        return `error: invalid client`;
    }

    public async login(): Promise<Object> {
        let oauth2Service = new Oauth2(this.ctx);
        let isValidRequest = await oauth2Service.validateAuthorizationRequest();
        if (!isValidRequest) {
            return { status: false, msg: 'invalid client' };
        }
        let post = <CredentialsInfo>this.ctx.request.body;
        let username = post.username;
        let password = post.password;
        let userService = new User();
        let user = await userService.getUserIdentity(username, password);
        if (!user.id) {
            return { status: false, msg: 'invalid credentials' };
        }
        let isLogin = userService.login(user);
        if (!isLogin) {
            return { status: false, msg: 'system error' };
        }
        return { status: true, msg: 'success' };
    }
}