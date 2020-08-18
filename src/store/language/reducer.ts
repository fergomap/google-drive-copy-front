import {LanguageActionTypesEnum} from './types';
import {ChangeLanguageAction} from './actions';
import LanguageState from './model/language.state';
import LanguageStateImp from './model/language.state.imp';
import MainAction from '../model/main.action';

const initialState: LanguageState = new LanguageStateImp();

const languageReducer = (state = initialState, action: MainAction) => {
	switch (action.type) {
		case LanguageActionTypesEnum.CHANGE_LANGUAGE: {
			return Object.assign({}, state, {
				language: (action as ChangeLanguageAction).language
			});
		}
		default:
			return state;
	}
};

export default languageReducer;
