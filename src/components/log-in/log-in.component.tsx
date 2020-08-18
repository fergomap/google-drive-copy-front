import React, { FunctionComponent, ReactElement } from 'react';
import './log-in.component.scss';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { LOG_IN_ACTION } from 'store/auth/actions';
import { useDispatch } from 'react-redux';
import { SHOW_LOADING_ACTION, HIDE_LOADING_ACTION } from 'store/loading/actions';
import { logIn } from 'services/auth.service';
import User from 'model/user';

interface LogInFormData {
    email: string;
    password: string;
}

const LogInComponent: FunctionComponent = (): ReactElement => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<LogInFormData>();

    const onSubmit = (formData: LogInFormData): void => {
        dispatch(SHOW_LOADING_ACTION);

        logIn(formData.email, formData.password)
            .then((newUser: User) => {
                localStorage.drive_copy_token = newUser.token;
                const logInAction = {...LOG_IN_ACTION};
                logInAction.user = newUser;
                dispatch(logInAction);
            })
            .catch()
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
                </form>
            </div>
        </div>
    </div>;
}

export default LogInComponent;
