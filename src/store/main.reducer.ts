import {combineReducers} from 'redux';
import authReducer from './auth/reducer';
import growlReducer from './growl/reducer';
import languageReducer from './language/reducer';
import loadingReducer from './loading/reducer';

export const mainReducer = combineReducers({
	auth: authReducer,
	growl: growlReducer,
	language: languageReducer,
	loading: loadingReducer
});