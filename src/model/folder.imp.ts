import Document from "./document";
import Folder from "./folder";
import User from "./user";
import UserImp from "./user.imp";
import { JsonObject, JsonProperty } from "json2typescript";
import DocumentImp from "./document.imp";
import ChildFolderImp from "./child-folder.imp";
import { MomentDeserializer } from "./deserializers/moment.deserializer";
import moment, { Moment } from "moment";

@JsonObject('FolderImp')
export default class FolderImp implements Folder {

    @JsonProperty('id', String, true)
    id: string;

    @JsonProperty('name', String, true)
    name: string;

    @JsonProperty('creator', UserImp, true)
    creator: User;

    @JsonProperty('parentFolderId', String, true)
    parentFolderId?: string;

    @JsonProperty('documents', [DocumentImp], true)
    documents: Document[];

    @JsonProperty('folders', [ChildFolderImp], true)
    folders: Folder[];

    @JsonProperty('createdAt', MomentDeserializer, true)
    createdAt: Moment;

    @JsonProperty('updatedAt', MomentDeserializer, true)
    updatedAt: Moment;

    constructor(id: string = '', name: string = '', creator: User = new UserImp(), parentFolderId?: string, 
                documents: Document[] = [], folders: Folder[] = [], createdAt: Moment = moment(), updatedAt: Moment = moment()) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.parentFolderId = parentFolderId;
        this.documents = documents;
        this.folders = folders;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}