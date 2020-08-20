import React, { FunctionComponent, ReactElement, useState, useEffect } from 'react';
import './sign-up.component.scss';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { LOG_IN_ACTION } from 'store/auth/actions';
import { useDispatch } from 'react-redux';
import { SHOW_LOADING_ACTION, HIDE_LOADING_ACTION } from 'store/loading/actions';
import User from 'model/user';
import { Link } from 'react-router-dom';
import { APP_CONSTANTS } from 'config/app.config';
import DragAndDropComponent from 'components/shared/drag-and-drop/drag-and-drop.component';
import { signUp } from 'services/auth.service';

export interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    file: any;
}

const SignUpComponent: FunctionComponent = (): ReactElement => {
    const dispatch = useDispatch();
    const { control, register, handleSubmit, errors, watch } = useForm<SignUpFormData>();
    const [ generalError, setGeneralError ] = useState<string>('');
	const watchField = watch('password');
	const watchRepeatField = watch('repeatPassword');

	useEffect(() => {
		setGeneralError('');
	}, [watchField, watchRepeatField]);

    const onSubmit = (formData: SignUpFormData): void => {
        if (formData.password !== formData.repeatPassword) {
            setGeneralError('passwords_not_match');
        } else {
            dispatch(SHOW_LOADING_ACTION);

            signUp(formData)
                .then((newUser: User) => {
                    const logInAction = {...LOG_IN_ACTION};
                    logInAction.user = newUser;
                    dispatch(logInAction);
                })
                .catch(err => setGeneralError(err.response.data.error))
                .finally(() => dispatch(HIDE_LOADING_ACTION));
        }
    };

    return <div className="sign-up-component">
        <div className="card">
            <div className="card-body">
                <h2 className="card-title"><FormattedMessage id="register"/></h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
                    <div className={`form-group ${errors.name && 'error'}`}>
                        <label><FormattedMessage id="name"/></label>
                        <input name="name" type="text" ref={register({ required: 'required_field' })} />
                        { errors.name && <small><FormattedMessage id={errors.name.message}/></small> }
                    </div>
                    <div className={`form-group ${errors.email && 'error'}`}>
                        <label><FormattedMessage id="email"/></label>
                        <input name="email" type="email" ref={register({ 
                            required: 'required_field',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid_email"
                            }
                        })} />
                        { errors.email && <small><FormattedMessage id={errors.email.message}/></small> }
                    </div>
                    <div className={`form-group ${errors.password && 'error'}`}>
                        <label><FormattedMessage id="password"/></label>
                        <input name="password" type="password" ref={register({ required: 'required_field' })} />
                        { errors.password && <small><FormattedMessage id={errors.password.message}/></small> }
                    </div>
                    <div className={`form-group ${errors.repeatPassword && 'error'}`}>
                        <label><FormattedMessage id="repeat_password"/></label>
                        <input name="repeatPassword" type="password" ref={register({ required: 'required_field' })} />
                        { errors.repeatPassword && <small><FormattedMessage id={errors.repeatPassword.message}/></small> }
                    </div>
                    <DragAndDropComponent control={control} errors={errors} fileType="image/*" label="profile_image" children={<span/>} />
                    <button type="submit" className="btn btn-primary btn-block">
                        <FormattedMessage id="register"/>
                    </button>
                    <Link to={APP_CONSTANTS.ROUTES.LOG_IN}>
                        <FormattedMessage id="go_back"/>
                    </Link>
                </form>
            </div>
        </div>
        { generalError && <div className="alert alert-danger" role="alert">
            <FormattedMessage id={generalError} />
        </div> }
    </div>;
}

export default SignUpComponent;
