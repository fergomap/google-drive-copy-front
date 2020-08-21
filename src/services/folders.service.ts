import Folder from "model/folder";
import axios from 'axios';
import { APP_CONSTANTS } from "config/app.config";
import { getAxiosHeader } from "./utils.service";
import { JsonConvert } from "json2typescript";
import FolderImp from "model/folder.imp";

const jsonConvert: JsonConvert = new JsonConvert();

export const getFolder = (folderId: string): Promise<Folder> => {
    return axios.get(`${APP_CONSTANTS.ENDPOINTS.FOLDERS}/${folderId}`, getAxiosHeader(localStorage.drive_copy_token))
        .then(res => jsonConvert.deserializeObject(res.data.folder, FolderImp));
};
