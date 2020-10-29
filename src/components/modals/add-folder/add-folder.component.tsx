import React, { FunctionComponent, ReactElement } from 'react';
import Folder from 'model/folder';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_LOADING_ACTION, HIDE_LOADING_ACTION } from 'store/loading/actions';
import { addFolder } from 'services/folders.service';
import { showGrowlMessage } from 'components/shared/growl/services/growl.service';
import GrowlMessageImp from 'model/growl-message.imp';
import { HIDE_MODAL_ACTION } from 'store/modal/actions';
import { FormattedMessage } from 'react-intl';
import MainState from 'store/model/main.state';
import { ADD_FOLDER_ACTION } from 'store/folder/actions';

export interface AddFolderData {
    name: string;
}

const AddFolderComponent: FunctionComponent = (): ReactElement => {
    const { currentFolder } = useSelector((state: MainState) => state.folder);
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<AddFolderData>();

    const onSubmit = (data: AddFolderData): void => {
        dispatch(SHOW_LOADING_ACTION);

        addFolder(currentFolder.id, data)
            .then((folder: Folder) => {
                const addFolderAction = {...ADD_FOLDER_ACTION};
                addFolderAction.folder = folder;
                dispatch(addFolderAction);
                dispatch(HIDE_MODAL_ACTION);
            })
            .catch(() => showGrowlMessage(new GrowlMessageImp('folder_create_error'), dispatch))
            .finally(() => dispatch(HIDE_LOADING_ACTION));
    };

    return <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <h2><FormattedMessage id="create_folder"/></h2>
        <div className={`form-group ${errors.name && 'error'}`}>
            <label><FormattedMessage id="name"/></label>
            <input name="name" type="text" ref={register({ required: 'required_field' })} />
            { errors.name && <small><FormattedMessage id={errors.name.message}/></small> }
            <button type="submit" className="btn btn-primary btn-block">
                <FormattedMessage id="create"/>
            </button>
        </div>
    </form>;
}

export default AddFolderComponent;
