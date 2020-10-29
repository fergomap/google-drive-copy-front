import MainAction from '../model/main.action';
import {ModalActionTypesEnum} from './types';
import ModalState from './model/modal.state';
import ModalStateImp from './model/modal.state.imp';
import {ReduxTypesEnum} from '../model/types';
import {ShowModalAction} from './actions';

const initialState: ModalState = new ModalStateImp();

const modalReducer = (state = initialState, action: MainAction) => {
    switch (action.type) {
        case ReduxTypesEnum.RESET: {
            return new ModalStateImp();
        }
        case ModalActionTypesEnum.SHOW_MODAL: {
            return Object.assign({}, state, {
                showModal: true,
                content: (action as ShowModalAction).content
            });
        }
        case ModalActionTypesEnum.HIDE_MODAL: {
            return Object.assign({}, state, {
                showModal: false
            });
        }
        default:
            return state;
    }
};

export default modalReducer;
