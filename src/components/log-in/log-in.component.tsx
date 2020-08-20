import React, { FunctionComponent, ReactElement, useState } from 'react';
import './log-in.component.scss';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { LOG_IN_ACTION } from 'store/auth/actions';
import { useDispatch } from 'react-redux';
import { SHOW_LOADING_ACTION, HIDE_LOADING_ACTION } from 'store/loading/actions';
import { logIn } from 'services/auth.service';
import User from 'model/user';
import { Link } from 'react-router-dom';
import { APP_CONSTANTS } from 'config/app.config';

interface LogInFormData {
    email: string;
    password: string;
}

const LogInComponent: FunctionComponent = (): ReactElement => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<LogInFormData>();
    const [ generalError, setGeneralError ] = useState<string>('');

    const onSubmit = (formData: LogInFormData): void => {
        dispatch(SHOW_LOADING_ACTION);

        logIn(formData.email, formData.password)
            .then((newUser: User) => {
                const logInAction = {...LOG_IN_ACTION};
                logInAction.user = newUser;
                dispatch(logInAction);
            })
            .catch(err => setGeneralError(err.response.data.error))
            .finally(() => dispatch(HIDE_LOADING_ACTION));
    };

    return <div className="log-in-component">
        <div className="card">
            <div className="card-body">
                <h2 className="card-title"><FormattedMessage id="log_in"/></h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
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
                    <button type="submit" className="btn btn-primary btn-block">
                        <FormattedMessage id="log_in"/>
                    </button>
                    <Link to={APP_CONSTANTS.ROUTES.SIGN_UP}>
                        <FormattedMessage id="create_account"/>
                    </Link>
                </form>
            </div>
        </div>
        { generalError && <div className="alert alert-danger" role="alert">
            <FormattedMessage id={generalError} />
        </div> }
    </div>;
}

export default LogInComponent;
