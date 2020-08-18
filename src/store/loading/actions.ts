import {LoadingActionTypesEnum} from './types';
import MainAction from '../model/main.action';

export const SHOW_LOADING_ACTION: MainAction = {
    type: LoadingActionTypesEnum.SHOW_LOADING
};

export const HIDE_LOADING_ACTION: MainAction = {
    type: LoadingActionTypesEnum.HIDE_LOADING
};
