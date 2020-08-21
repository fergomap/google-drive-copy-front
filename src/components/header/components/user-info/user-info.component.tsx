import React, { FunctionComponent, ReactElement } from 'react';
import './user-info.component.scss';
import MainState from 'store/model/main.state';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LOG_OUT_ACTION } from 'store/auth/actions';
import User from 'model/user';

interface UserInfoComponentProps {
    selectedUser?: User;
}

const UserInfoComponent: FunctionComponent<UserInfoComponentProps> = ({ selectedUser }): ReactElement => {
	const { user } = useSelector((state: MainState) => state.auth);
    const dispatch = useDispatch();
    const userInfo = selectedUser || user;

    const logOut = (): void => {
        localStorage.drive_copy_token = '';
        dispatch(LOG_OUT_ACTION);
    };

    return <div className={`user-info-component ${selectedUser && 'no-padding'}`} style={selectedUser ? {} : { minWidth: '200px' }}>
        <img alt="user" src={userInfo.avatar} className={selectedUser && 'small-image'}/>
        <p className="name">{ userInfo.name }</p>
        <p>{ userInfo.email }</p>
        { !selectedUser && <button className="btn btn-block" onClick={logOut}>
            <FormattedMessage id="log_out" />
        </button> }
    </div>;
}

export default UserInfoComponent;
