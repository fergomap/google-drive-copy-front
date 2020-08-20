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
                    <svg viewBox="0 0 16 16" className="remove-icon" onClick={removeFile}>
                        <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                        <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                    </svg>
				</div> : <div className="drag-and-drop-component-content--wrapper">
                    <svg viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 1 0V6.707l1.146 1.147a.5.5 0 0 0 .708-.708z"/>
                    </svg>
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
