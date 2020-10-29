import Folder from 'model/folder';
import FolderState from './folder.state';
import FolderImp from 'model/folder.imp';

export default class FolderStateImp implements FolderState {
    currentFolder: Folder;

    constructor(currentFolder: Folder = new FolderImp()) {
        this.currentFolder = currentFolder;
    }
}
