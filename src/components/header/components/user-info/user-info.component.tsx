import React, { FunctionComponent, ReactElement } from 'react';
import './user-info.component.scss';
import MainState from 'store/model/main.state';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LOG_OUT_ACTION } from 'store/auth/actions';

const UserInfoComponent: FunctionComponent = (): ReactElement => {
	const { user } = useSelector((state: MainState) => state.auth);
    const dispatch = useDispatch();

    const logOut = (): void => {
        localStorage.drive_copy_token = '';
        dispatch(LOG_OUT_ACTION);
    };

    return <div className="user-info-component">
        <img src={user.avatar} alt="avatar"/>
        <p className="name">{ user.name }</p>
        <p>{ user.email }</p>
        <button className="btn btn-block" onClick={logOut}>
            <FormattedMessage id="log_out" />
        </button>
    </div>;
}

export default UserInfoComponent;
