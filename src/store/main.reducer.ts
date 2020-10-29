import {combineReducers} from 'redux';
import authReducer from './auth/reducer';
import folderReducer from './folder/reducer';
import growlReducer from './growl/reducer';
import languageReducer from './language/reducer';
import loadingReducer from './loading/reducer';
import modalReducer from './modal/reducer';

export const mainReducer = combineReducers({
	auth: authReducer,
	folder: folderReducer,
	growl: growlReducer,
	language: languageReducer,
	loading: loadingReducer,
	modal: modalReducer
});