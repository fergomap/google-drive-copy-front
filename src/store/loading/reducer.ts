import {LoadingActionTypesEnum} from './types';
import LoadingState from './model/loading.state';
import LoadingStateImp from './model/loading.state.imp';
import MainAction from 'store/model/main.action';

const initialState: LoadingState = new LoadingStateImp();

const loadingReducer = (state = initialState, action: MainAction) => {
    switch (action.type) {
        case LoadingActionTypesEnum.SHOW_LOADING: {
            return Object.assign({}, state, {
                loading: true,
                loadingCounter: state.loadingCounter + 1
            });
        }
        case LoadingActionTypesEnum.HIDE_LOADING: {
            let loadingCounter: number = state.loadingCounter;

            if (state.loadingCounter > 0) {
                loadingCounter--;
            }

            return Object.assign({}, state, {
                loading: loadingCounter !== 0,
                loadingCounter: loadingCounter
            });
        }
        default:
            return state;
    }
};

export default loadingReducer;
