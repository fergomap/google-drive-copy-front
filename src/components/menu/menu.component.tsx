import React, { FunctionComponent, ReactElement } from 'react';
import './menu.component.scss';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import MainState from 'store/model/main.state';
import { MENU_CONSTANTS } from './config/menu.config';
import MenuLink from './model/menu-link';
import { openModal } from 'services/utils.service';
import AddFolderComponent from 'components/modals/add-folder/add-folder.component';

const MenuComponent: FunctionComponent = (): ReactElement => {
    const { user } = useSelector((state: MainState) => state.auth);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    return <div className="menu-component">
        <div className="menu-title">
            <h5>{ user.name }</h5>
            <h6>{ user.email }</h6>
        </div>
        <div className="menu-buttons">
            <button onClick={() => openModal(dispatch, <AddFolderComponent/>)}>
                <i className="fa fa-plus"/>
                <FormattedMessage id="new_folder"/>
            </button>
            <button>
                <i className="fa fa-plus"/>
                <FormattedMessage id="new_document"/>
            </button>
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
