/* istanbul ignore file */
import React, {ReactElement} from 'react';
import {ModalActionTypesEnum} from './types';
import MainAction from '../model/main.action';

export interface ShowModalAction extends MainAction {
    content: ReactElement;
}

export const SHOW_MODAL_ACTION: ShowModalAction = {
    type: ModalActionTypesEnum.SHOW_MODAL,
    content: <div/>
};

export const HIDE_MODAL_ACTION: MainAction = {
    type: ModalActionTypesEnum.HIDE_MODAL
};
