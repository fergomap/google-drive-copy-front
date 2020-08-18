import MainAction from '../model/main.action';
import {GrowlActionTypesEnum} from './types';
import GrowlMessage from 'model/growl-message';
import GrowlMessageImp from 'model/growl-message.imp';

export interface ShowGrowlMessageAction extends MainAction {
	message: GrowlMessage;
}

export const SHOW_GROWL_MESSAGE_ACTION: ShowGrowlMessageAction = {
	type: GrowlActionTypesEnum.SHOW_MESSAGE,
	message: new GrowlMessageImp('loading_error')
};

export const HIDE_GROWL_MESSAGE_ACTION: MainAction = {
	type: GrowlActionTypesEnum.HIDE_MESSAGE
};
