import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import './home.component.scss';
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

const HomeComponent: FunctionComponent = (): ReactElement => {
    const { user } = useSelector((state: MainState) => state.auth);
    const { formatDateTime } = useSelector((state: MainState) => state.language.language);
    const dispatch = useDispatch();
    const [ rootFolder, setRootFolder ] = useState<Folder>(new FolderImp());
    const [ selectedFolder, setSelectedFolder ] = useState<Folder>(new FolderImp());
    const [ showFolderDetail, setShowFolderDetail ] = useState<boolean>(false);
    const [ selectedDocument, setSelectedDocument ] = useState<Document>(new DocumentImp());
    const [ showDocumentDetail, setShowDocumentDetail ] = useState<boolean>(false);

    useEffect(() => {
        dispatch(SHOW_LOADING_ACTION);

        getFolder(user.rootFolderId)
            .then((f: Folder) => setRootFolder(f))
            .catch(err => showGrowlMessage(new GrowlMessageImp(err.response.data.error || 'folder_load_error'), dispatch))
            .finally(() => dispatch(HIDE_LOADING_ACTION
        ));
    }, [dispatch, user.rootFolderId]);

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

    return <div className="home-component">
        <ol className="breadcrumb">
            <li className="breadcrumb-item active">{ rootFolder.name }</li>
        </ol>
        <div className="home-container">
            <div className="container">
                <div className="row">
                    <div className="col-12 home-title">
                        <svg viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
                        </svg>
                        <h4 className="no-margin"><FormattedMessage id="folders"/></h4>
                    </div>
                    { rootFolder.folders.map((f: Folder, index: number) => {
                        return <div key={index} className="col-sm-12 col-md-3">
                            <div className="card" onClick={() => selectFolder(f)}>
                                <div className="card-body">
                                    <h6 className="card-title">{ f.name }</h6>
                                </div>
                            </div>
                        </div>;
                    }) }
                    <div className="col-12 home-title">
                        <svg viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2 3a2 2 0 0 1 2-2h5.293a1 1 0 0 1 .707.293L13.707 5a1 1 0 0 1 .293.707V13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3zm7 2V2l4 4h-3a1 1 0 0 1-1-1zM4.5 8a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        <h4 className="no-margin"><FormattedMessage id="documents"/></h4>
                    </div>
                        { rootFolder.documents.map((d: Document, index: number) => {
                            return <div key={index} className="col-sm-12 col-md-3">
                                <div className="card" onClick={() => selectDocument(d)}>
                                    <div className="card-body">
                                        <h6 className="card-title">{ d.name }</h6>
                                    </div>
                                </div>
                            </div>;
                        }) }
                </div>
            </div>
            { showFolderDetail && <div className="detail">
                <div className="detail-title">
                    <h4>{ selectedFolder.name }</h4>
                    <svg viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
                    </svg>
                </div>
                <p className="label"><FormattedMessage id="owner"/>:</p>
                <UserLabelComponent user={selectedFolder.creator}/>
                <p className="label"><FormattedMessage id="created"/>:</p>
                <p>{ selectedFolder.createdAt.format(formatDateTime) }</p>
                <p className="label"><FormattedMessage id="edited"/>:</p>
                <p>{ selectedFolder.updatedAt.format(formatDateTime) }</p>
            </div> }
            { showDocumentDetail && <div className="detail">
                <div className="detail-title">
                    <h4>{ selectedDocument.name }</h4>
                    { getFileTypeIcon(selectedDocument.type) }
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

export default HomeComponent;
