import LoadingState from './loading.state';

export default class LoadingStateImp implements LoadingState {
    loading: boolean;
    loadingCounter: number;

    constructor(loading: boolean = false, loadingCounter: number = 0) {
        this.loading = loading;
        this.loadingCounter = loadingCounter;
    }

}
