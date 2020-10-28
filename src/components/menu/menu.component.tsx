import React, { FunctionComponent, ReactElement } from 'react';
import './menu.component.scss';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import MainState from 'store/model/main.state';
import { MENU_CONSTANTS } from './config/menu.config';
import MenuLink from './model/menu-link';

const MenuComponent: FunctionComponent = (): ReactElement => {
    const { user } = useSelector((state: MainState) => state.auth);
    const { pathname } = useLocation();

    return <div className="menu-component">
        <div className="menu-title">
            <h5>{ user.name }</h5>
            <h6>{ user.email }</h6>
        </div>
        { MENU_CONSTANTS.LINKS.map((link: MenuLink, index: number) => {
            return <Link key={index} className={`menu-item ${pathname.includes(link.route) && 'active'}`} to={link.route}>
                { link.icon }
                <FormattedMessage id={link.label}/>
            </Link>;
        }) }
    </div>;
};

export default MenuComponent;
