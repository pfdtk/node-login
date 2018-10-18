import * as Router from 'koa-router';

export default interface AuthGrant {
    validateAuthorizationRequest(ctx: Router.IRouterContext): Promise<boolean>;
}