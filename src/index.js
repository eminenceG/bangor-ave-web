import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Login from './containers/login/login'
import Register from './containers/register/register'

import reducers from './reducers/reducer'
import './config/config'

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
const bootstrap = require('bootstrap');

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension():f=>f
));


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

