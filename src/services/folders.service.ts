import Folder from 'model/folder';
import axios from 'axios';
import { APP_CONSTANTS } from 'config/app.config';
import { getAxiosHeader } from './utils.service';
import { JsonConvert } from 'json2typescript';
import FolderImp from 'model/folder.imp';
import { EditFolderData } from 'components/modals/edit-folder/edit-folder.component';
import { AddFolderData } from 'components/modals/add-folder/add-folder.component';

const jsonConvert: JsonConvert = new JsonConvert();

export const getFolder = (folderId: string): Promise<Folder> => {
    return axios.get(`${APP_CONSTANTS.ENDPOINTS.FOLDERS}/${folderId}`, getAxiosHeader(localStorage.drive_copy_token))
        .then(res => jsonConvert.deserializeObject(res.data.folder, FolderImp));
};

export const editFolder = (folderId: string, data: EditFolderData): Promise<Folder> => {
    return axios.put(`${APP_CONSTANTS.ENDPOINTS.FOLDERS}/${folderId}`, { name: data.name }, getAxiosHeader(localStorage.drive_copy_token))
        .then(res => jsonConvert.deserializeObject(res.data.folder, FolderImp));
};

export const addFolder = (parentFolderId: string, data: AddFolderData): Promise<Folder> => {
    return axios.post(APP_CONSTANTS.ENDPOINTS.FOLDERS, { parentFolderId, name: data.name }, getAxiosHeader(localStorage.drive_copy_token))
        .then(res => jsonConvert.deserializeObject(res.data.folder, FolderImp));
};
