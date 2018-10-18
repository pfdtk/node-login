import Controller from './base';
import Oauth2 from '../service/oauth2';

export default class Authorize extends Controller {
    public async index(): Promise<string> {
        let oauth2 = new Oauth2(this.ctx);
        let isValidRequest = await oauth2.validateAuthorizationRequest();
        if (isValidRequest) {
            return `login form`;
        }
        return `error: invalid client`;
    }

    public async login(): Promise<Object> {
        let oauth2 = new Oauth2(this.ctx);
        let isValidRequest = await oauth2.validateAuthorizationRequest();
        if (!isValidRequest) {
            return {status: false, msg: 'invalid client'};
        }
        return {status: false, msg: 'invalid credentials'};
    }
}