import Controller from './base';
import Oauth2 from '../service/oauth2';

export default class Authorize extends Controller {
    public async index(): Promise<string> {
        let oauth2 = new Oauth2(this.ctx);
        let isValidRequest = await oauth2.validateAuthorizationRequest();
        return `result: ${isValidRequest}`;
    }
}