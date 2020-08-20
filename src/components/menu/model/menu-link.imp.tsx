import React, { ReactElement } from "react";
import MenuLink from "./menu-link";

export default class MenuLinkImp implements MenuLink {
    route: string;
    icon: ReactElement;
    label: string;

    constructor(route: string = '', icon: ReactElement = <div/>,label: string = '') {
        this.route = route;
        this.icon = icon;
        this.label = label;
    }
}
