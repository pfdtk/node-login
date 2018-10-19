import ClientEntity from '../entity/client';

export default class Client {
    public async getClient(clientId: string): Promise<ClientEntity> {
        return {
            id: clientId,
            secret: 'abc',
            name: 'name',
            redirectUri: 'http://test.jhj.com/login/default/oauth2'
        };
    }
}