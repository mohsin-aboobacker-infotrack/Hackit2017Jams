import 'infotrack-ui/lib/infotrackui.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './App/routes';
import configureStore from './App/store';

const store = configureStore({});
require("es6-promise").polyfill();

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>, document.getElementById('app')
);
