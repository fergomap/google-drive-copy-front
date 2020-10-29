/* istanbul ignore file */
import React, {ReactElement} from 'react';
import ModalState from './modal.state';

export default class ModalStateImp implements ModalState {

    showModal: boolean;
    content: ReactElement;

    constructor(showModal: boolean = false, content: ReactElement = <div/>) {
        this.showModal = showModal;
        this.content = content;
    }
}
