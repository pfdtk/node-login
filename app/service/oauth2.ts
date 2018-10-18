import * as Router from 'koa-router';
import AuthCodeGrant from './oauth2/grant/authCodeGrant';
import AuthGrant from './oauth2/grant/authGrant';

interface GrantType {
    type: string,
    grant: AuthGrant
}

export default class Oauth2 {
    public ctx: Router.IRouterContext;

    constructor(ctx: Router.IRouterContext) {
        this.ctx = ctx;
    }

    public async validateAuthorizationRequest(): Promise<boolean> {
        for (let value of this.enabledGrantTypes()) {
            let isValidRequest = await value.grant.validateAuthorizationRequest(this.ctx);
            if (isValidRequest === true) {
                return true;
            }
        }
        return false;
    }

    protected enabledGrantTypes(): Array<GrantType> {
        return [{
            'type': 'authorization_code',
            'grant': new AuthCodeGrant()
        }];
    }
}