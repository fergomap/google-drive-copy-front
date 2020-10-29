import MainAction from '../model/main.action';
import {FolderActionTypesEnum} from './types';
import Folder from 'model/folder';
import FolderImp from 'model/folder.imp';

export interface SetCurrentFolderAction extends MainAction {
	folder: Folder;
}

export const SET_CURRENT_FOLDER_ACTION: SetCurrentFolderAction = {
	type: FolderActionTypesEnum.SET_CURRENT_FOLDER,
	folder: new FolderImp()
};

export const ADD_FOLDER_ACTION: SetCurrentFolderAction = {
	type: FolderActionTypesEnum.ADD_FOLDER,
	folder: new FolderImp()
};
