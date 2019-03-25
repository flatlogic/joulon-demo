import 'expose-loader?jQuery!jquery' // eslint-disable-line
import 'expose-loader?$!jquery' // eslint-disable-line
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import axios from 'axios';

import config from './config';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import reducers from './reducers';
import * as $ from 'jquery'
import Auth from './auth/Auth';
window.jQuery = window.$ = $;

axios.defaults.baseURL = config.baseURLApi;
const auth = new Auth();

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App auth={auth} />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
