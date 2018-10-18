import Controller from './base';
import Oauth2 from '../service/oauth2';

export default class Authorize extends Controller {
    public index(): string {
        let oauth2 = new Oauth2(this.ctx);
        let isValidRequest = oauth2.validateAuthorizationRequest();
        return `html1`;
    }
}