import React, {FunctionComponent, useState, ChangeEvent} from 'react';
import {FormattedMessage} from 'react-intl';
import {Controller, FieldError, Control} from 'react-hook-form';
import './drag-and-drop.component.scss';
import {DeepMap} from 'react-hook-form/dist/types/utils';

interface DragAndDropComponentProps {
	fileType: string;
	label: string;
	errors: DeepMap<FormData, FieldError>;
	control: Control<FormData>;
	defaultFile?: string;
}

interface FormData {
	file: any;
}

const DragAndDropComponent: FunctionComponent<DragAndDropComponentProps> = ({fileType, label, errors, control, defaultFile}) => {
	const [valueFile, setValueFile] = useState<File | null>(defaultFile ? new File([], defaultFile) : null);

	const onChangeAttachment = (e: ChangeEvent<HTMLInputElement>, onChange: Function): void => {
		if (e.target.files) {
			setValueFile(e.target.files[0]);
			onChange(e.target.files[0]);
		}
	};

	const removeFile = (): void => {
		setValueFile(null);
		control.setValue('file', undefined);
	};

	return <div className={`form-group ${errors.file && 'error'}`}>
		<label className="form-group__label"><FormattedMessage id={label}/></label>
		<div className={`drag-and-drop-component ${valueFile ? 'height__addon' : ''}`}>
			<Controller
				control={control}
				name="file"
				rules={{required: 'required_field'}}
				render={({onChange}) => (
					<input
						type="file"
						className={valueFile ? 'height__0' : ''}
						accept={fileType}
						onChange={e => onChangeAttachment(e, onChange)}
					/>
				)}
			/>
			<div className="drag-and-drop-component-content">
				{ valueFile ? <div className="drag-and-drop-component-content--value u-display--none">
                    <span className="attachment__file u-text--secondary">
                        { valueFile?.name }
                    </span>
                    <i className="fas fa-times" onClick={removeFile}/>
				</div> : <div className="drag-and-drop-component-content--wrapper">
                    <i className="fas fa-cloud"/>
                    <br/>
					<span><FormattedMessage id="drag_your_document"/></span>
				</div> }
			</div>
		</div>
		{!valueFile && errors.file && <small>
            <FormattedMessage id={errors.file.message}/>
        </small>}
	</div>;
};

export default DragAndDropComponent;
