import React, { FunctionComponent, ReactElement } from 'react';
import './App.scss';
import MainComponent from 'components/main/main.component';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mainReducer } from 'store/main.reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-tooltip/assets/bootstrap_white.css';

const App: FunctionComponent = (): ReactElement => {
    return <Provider store={createStore(mainReducer, composeWithDevTools())}>
        <MainComponent/>
    </Provider>;
}

export default App;
