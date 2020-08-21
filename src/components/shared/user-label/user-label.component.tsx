import React, { FunctionComponent, ReactElement } from "react";
import './user-label.component.scss';
import User from "model/user";
import Tooltip from "rc-tooltip";
import UserInfoComponent from "components/header/components/user-info/user-info.component";

interface UserLabelComponentProps {
    user: User;
}

const UserLabelComponent: FunctionComponent<UserLabelComponentProps> = ({ user }): ReactElement => {
    return <Tooltip placement="bottom" trigger={['hover']} overlay={<UserInfoComponent selectedUser={user}/>}>
        <p className="user-label-component">
            <img alt="user" src={user.avatar}/>
            { user.name }
        </p>
    </Tooltip>;
}

export default UserLabelComponent;
