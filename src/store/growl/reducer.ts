import MainAction from '../model/main.action';
import {GrowlActionTypesEnum} from './types';
import GrowlState from './model/growl.state';
import GrowlStateImp from './model/growl.state.imp';
import {ReduxTypesEnum} from '../model/types';
import {ShowGrowlMessageAction} from './actions';

const initialState: GrowlState = new GrowlStateImp();

const growlReducer = (state = initialState, action: MainAction) => {
	switch (action.type) {
		case ReduxTypesEnum.RESET: {
			return new GrowlStateImp();
		}
		case GrowlActionTypesEnum.SHOW_MESSAGE: {
			const messages = [...state.messages];
			messages.push((action as ShowGrowlMessageAction).message);

			return Object.assign({}, state, {
				messages
			});
		}
		case GrowlActionTypesEnum.HIDE_MESSAGE: {
			const messages = [...state.messages];
			messages.shift();

			return Object.assign({}, state, {
				messages
			});
		}
		default:
			return state;
	}
};

export default growlReducer;
