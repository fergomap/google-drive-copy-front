import {AuthActionTypesEnum} from './types';
import AuthState from './model/auth.state';
import AuthStateImp from './model/auth.state.imp';
import MainAction from 'store/model/main.action';
import { LogInAction } from './actions';
import UserImp from 'model/user.imp';

const initialState: AuthState = new AuthStateImp();

const authReducer = (state = initialState, action: MainAction) => {
    switch (action.type) {
        case AuthActionTypesEnum.LOG_IN: {
            return Object.assign({}, state, {
                user: (action as LogInAction).user
            });
        }
        case AuthActionTypesEnum.LOG_OUT: {
            return Object.assign({}, state, {
                user: new UserImp()
            });
        }
        default:
            return state;
    }
};

export default authReducer;
