import React from 'react';
import MenuLink from "../model/menu-link";
import MenuLinkImp from "../model/menu-link.imp";
import { APP_CONSTANTS } from "config/app.config";

interface MenuConfig {
    LINKS: MenuLink[];
}

export const MENU_CONSTANTS: MenuConfig = {
    LINKS: [
        new MenuLinkImp(
            APP_CONSTANTS.ROUTES.HOME,
            <i className="fas fa-home fa-2x"/>,
            'home'
        ),
        new MenuLinkImp(
            APP_CONSTANTS.ROUTES.FAVOURITES,
            <i className="fas fa-star fa-2x"/>,
            'favourites'
        ),
        new MenuLinkImp(
            APP_CONSTANTS.ROUTES.TRASH,
            <i className="fas fa-trash fa-2x"/>,
            'trash'
        )
    ]
};
