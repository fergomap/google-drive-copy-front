import React, { FunctionComponent, ReactElement } from 'react';
import './header.component.scss';
import MainState from 'store/model/main.state';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import Tooltip from 'rc-tooltip';
import UserInfoComponent from './components/user-info/user-info.component';

const HeaderComponent: FunctionComponent = (): ReactElement => {
	const { user } = useSelector((state: MainState) => state.auth);
    const { formatMessage } = useIntl();

    return <div className="header-component">
        <img src={process.env.PUBLIC_URL + 'drive.png'} alt="logo"/>
        <input placeholder={formatMessage({ id: 'search' })} />
        <Tooltip placement="bottom" trigger={['click']} overlay={<UserInfoComponent/>}>
            <div className="avatar" style={{ background: `url(${user.avatar}) 50% 50% no-repeat` }} />
        </Tooltip>
    </div>;
}

export default HeaderComponent;
