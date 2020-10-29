import React, { FunctionComponent, ReactElement } from 'react';
import Folder from 'model/folder';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { SHOW_LOADING_ACTION, HIDE_LOADING_ACTION } from 'store/loading/actions';
import { editFolder } from 'services/folders.service';
import { showGrowlMessage } from 'components/shared/growl/services/growl.service';
import GrowlMessageImp from 'model/growl-message.imp';
import { HIDE_MODAL_ACTION } from 'store/modal/actions';
import { FormattedMessage } from 'react-intl';

interface EditFolderComponentProps {
    folder: Folder;
}

export interface EditFolderData {
    name: string;
}

const EditFolderComponent: FunctionComponent<EditFolderComponentProps> = ({ folder }): ReactElement => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<EditFolderData>({ defaultValues: { name: folder.name } });

    const onSubmit = (data: EditFolderData): void => {
        dispatch(SHOW_LOADING_ACTION);

        editFolder(folder.id, data)
            .then(() => {
                folder.name = data.name
                dispatch(HIDE_MODAL_ACTION);
            })
            .catch(() => showGrowlMessage(new GrowlMessageImp('folder_update_error'), dispatch))
            .finally(() => dispatch(HIDE_LOADING_ACTION));
    };

    return <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <h2><FormattedMessage id="edit_folder"/></h2>
        <div className={`form-group ${errors.name && 'error'}`}>
            <label><FormattedMessage id="name"/></label>
            <input name="name" type="text" ref={register({ required: 'required_field' })} />
            { errors.name && <small><FormattedMessage id={errors.name.message}/></small> }
            <button type="submit" className="btn btn-primary btn-block">
                <FormattedMessage id="edit"/>
            </button>
        </div>
    </form>;
}

export default EditFolderComponent;
