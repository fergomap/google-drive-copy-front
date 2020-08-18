import {AuthActionTypesEnum} from './types';
import MainAction from '../model/main.action';
import User from 'model/user';
import UserImp from 'model/user.imp';

export interface LogInAction extends MainAction {
    user: User;
}

export const LOG_IN_ACTION: LogInAction = {
    type: AuthActionTypesEnum.LOG_IN,
    user: new UserImp()
};

export const LOG_OUT_ACTION: MainAction = {
    type: AuthActionTypesEnum.LOG_OUT
};
