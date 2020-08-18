import AuthState from './auth.state';
import UserImp from 'model/user.imp';
import User from 'model/user';

export default class AuthStateImp implements AuthState {
    user: User;

    constructor(user: User = new UserImp()) {
        this.user = user;
    }
}
