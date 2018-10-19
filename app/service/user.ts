import UserEntity from '../entity/user';

export default class User {
    public async getUserIdentity(username: string, password: string): Promise<UserEntity> {
        return {
            id: 1,
            username: username
        };
    }

    public login(user: UserEntity): boolean {
        return true;
    }
}