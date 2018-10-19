import * as Router from 'koa-router';
import AuthGrant from './authGrant';
import ClientEntity from '../../../entity/client';
import {default as ClientRepository} from '../../../repository/client';

export default class AuthCodeGrant implements AuthGrant {
    /**
     * request example:
     * /authorize
     * ?state=OwZAJYc5p%2BXJJCG4ImQwZQTWJpUQtC9G
     * &scope=test1
     * &response_type=code
     * &approval_prompt=auto
     * &client_id=client1
     * &redirect_uri=http%3A%2F%2Ftest.jhj.com%2Flogin%2Fdefault%2Foauth2
     */
    public async validateAuthorizationRequest(ctx: Router.IRouterContext): Promise<boolean> {
        let query = ctx.request.query;
        let clientId = query.client_id || '';
        let redirectUri = query.redirect_uri || '';
        let clientEntity = await this.getClientEntity(clientId);
        if (redirectUri !== clientEntity.redirectUri) return false;
        return true;
    }

    public async getClientEntity(clientId: string): Promise<ClientEntity> {
        let repository = new ClientRepository();
        return await repository.getClient(clientId);
    }

}