import MainAction from '../model/main.action';
import {FolderActionTypesEnum} from './types';
import FolderState from './model/folder.state';
import FolderStateImp from './model/folder.state.imp';
import {ReduxTypesEnum} from '../model/types';
import {SetCurrentFolderAction} from './actions';

const initialState: FolderState = new FolderStateImp();

const FolderReducer = (state = initialState, action: MainAction) => {
	switch (action.type) {
		case ReduxTypesEnum.RESET: {
			return new FolderStateImp();
		}
		case FolderActionTypesEnum.SET_CURRENT_FOLDER: {
			return Object.assign({}, state, {
				currentFolder: (action as SetCurrentFolderAction).folder
			});
		}
		case FolderActionTypesEnum.ADD_FOLDER: {
			const { currentFolder } = state;
			currentFolder.folders.push((action as SetCurrentFolderAction).folder);

			return Object.assign({}, state, {
				currentFolder
			});
		}
		default:
			return state;
	}
};

export default FolderReducer;
