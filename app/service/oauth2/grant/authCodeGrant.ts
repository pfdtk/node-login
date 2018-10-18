import * as Router from 'koa-router';
import AuthGrant from './authGrant';

export default class AuthCodeGrant implements AuthGrant {
    public validateAuthorizationRequest(ctx: Router.IRouterContext):boolean {
        return true;
    }
}