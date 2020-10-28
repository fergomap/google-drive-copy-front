import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import './folder.component.scss';
import Folder from 'model/folder';
import FolderImp from 'model/folder.imp';
import { useSelector, useDispatch } from 'react-redux';
import MainState from 'store/model/main.state';
import { SHOW_LOADING_ACTION, HIDE_LOADING_ACTION } from 'store/loading/actions';
import { getFolder } from 'services/folders.service';
import { showGrowlMessage } from 'components/shared/growl/services/growl.service';
import GrowlMessageImp from 'model/growl-message.imp';
import { FormattedMessage } from 'react-intl';
import Document from 'model/document';
import DocumentImp from 'model/document.imp';
import UserLabelComponent from 'components/shared/user-label/user-label.component';
import User from 'model/user';
import { getFileTypeIcon } from 'services/file-type.service';
import { Link, useParams, useHistory } from 'react-router-dom';
import { APP_CONSTANTS } from 'config/app.config';

const FolderComponent: FunctionComponent = (): ReactElement => {
    const { user } = useSelector((state: MainState) => state.auth);
    const { formatDateTime } = useSelector((state: MainState) => state.language.language);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { push } = useHistory();
    const [ rootFolder, setRootFolder ] = useState<Folder>(new FolderImp());
    const [ selectedFolder, setSelectedFolder ] = useState<Folder>(new FolderImp());
    const [ showFolderDetail, setShowFolderDetail ] = useState<boolean>(false);
    const [ selectedDocument, setSelectedDocument ] = useState<Document>(new DocumentImp());
    const [ showDocumentDetail, setShowDocumentDetail ] = useState<boolean>(false);
    
    useEffect(() => {
        dispatch(SHOW_LOADING_ACTION);

        getFolder(id || user.rootFolderId)
            .then((f: Folder) => setRootFolder(f))
            .catch(err => showGrowlMessage(new GrowlMessageImp(err.response.data.error || 'folder_load_error'), dispatch))
            .finally(() => dispatch(HIDE_LOADING_ACTION
        ));
    }, [dispatch, id, user.rootFolderId]);

    const selectFolder = (folder: Folder): void => {
        setShowDocumentDetail(false);
        setSelectedDocument(new DocumentImp());
        setSelectedFolder(folder);
        setShowFolderDetail(true);
    };

    const selectDocument = (document: Document): void => {
        setShowFolderDetail(false);
        setSelectedFolder(new FolderImp());
        setSelectedDocument(document);
        setShowDocumentDetail(true);
    };

    const openFolder = (folderId: string): void => {
        setShowFolderDetail(false);
        push(`${APP_CONSTANTS.ROUTES.FOLDER}/${folderId}`);
    };

    return <div className="folder-component">
        <ol className="breadcrumb">
            <li className="breadcrumb-item active">{ rootFolder.name }</li>
        </ol>
        <div className="folder-container">
            <div className="container">
                <div className="row">
                    <div className="col-12 folder-title">
                        <h4 className="no-margin"><FormattedMessage id="folders"/></h4>
                    </div>
                    { rootFolder.folders.map((f: Folder, index: number) => {
                        return <div key={index} className="col-sm-12 col-md-3">
                            <div className="card" onClick={() => selectFolder(f)} onDoubleClick={() => openFolder(f.id)}>
                                <div className="card-body">
                                    <i className="fas fa-folder"/>
                                    <h6 className="card-title">{ f.name }</h6>
                                </div>
                            </div>
                        </div>;
                    }) }
                    <div className="col-12 folder-title">
                        <h4 className="no-margin"><FormattedMessage id="documents"/></h4>
                    </div>
                        { rootFolder.documents.map((d: Document, index: number) => {
                            return <div key={index} className="col-sm-12 col-md-3">
                                <div className="card" onClick={() => selectDocument(d)}>
                                    <div className="card-body">
                                        { getFileTypeIcon(d.type) }
                                        <h6 className="card-title">{ d.name }</h6>
                                    </div>
                                </div>
                            </div>;
                        }) }
                </div>
            </div>
            { showFolderDetail && <div className="detail">
                <div className="detail-title">
                    <div>
                        <i className="fas fa-folder"/>
                        <h4>{ selectedFolder.name }</h4>
                    </div>
                    <div>
                        <i className="fa fa-pen" onClick={() => setShowFolderDetail(false)}/>
                        <i className="fas fa-times" onClick={() => setShowFolderDetail(false)}/>
                    </div>
                </div>
                <p className="label"><FormattedMessage id="owner"/>:</p>
                <UserLabelComponent user={user}/>
                <p className="label"><FormattedMessage id="created"/>:</p>
                <p>{ selectedFolder.createdAt.format(formatDateTime) }</p>
                <p className="label"><FormattedMessage id="edited"/>:</p>
                <p>{ selectedFolder.updatedAt.format(formatDateTime) }</p>
                <Link to={`${APP_CONSTANTS.ROUTES.FOLDER}/${selectedFolder.id}`} onClick={() => setShowFolderDetail(false)}><FormattedMessage id="open"/></Link>
            </div> }
            { showDocumentDetail && <div className="detail">
                <div className="detail-title">
                    <div>
                        { getFileTypeIcon(selectedDocument.type) }
                        <h4>{ selectedDocument.name }</h4>
                    </div>
                    <i className="fas fa-times" onClick={() => setShowDocumentDetail(false)}/>
                </div>
                <p className="label"><FormattedMessage id="owner"/>:</p>
                <UserLabelComponent user={selectedDocument.creator}/>
                <p className="label"><FormattedMessage id="can_edit"/>:</p>
                { selectedDocument.editors.map((editor: User, index: number) => {
                    return <UserLabelComponent user={editor} key={index} />;
                }) }
                <p className="label"><FormattedMessage id="can_view"/>:</p>
                { selectedDocument.viewers.map((viewer: User, index: number) => {
                    return <UserLabelComponent user={viewer} key={index} />;
                }) }
                <p className="label"><FormattedMessage id="created"/>:</p>
                <p>{ selectedDocument.createdAt.format(formatDateTime) }</p>
                <p className="label"><FormattedMessage id="edited"/>:</p>
                <p>{ selectedDocument.updatedAt.format(formatDateTime) }</p>
            </div> }
        </div>
    </div>;
}

export default FolderComponent;
