import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Job from './containers/job/job'
import WidgetList from './containers/WidgetList/WidgetList'
import Home from './containers/homepage/homepage'
import LoginContainer from './containers/login/login'
import RegisterContainer from './containers/register/register'
import HRProfileContainer from './containers/HR-profile/HR-profile'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {userReducer} from './reducers/reducer';
import {Provider} from 'react-redux'
import './config/config'

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
const bootstrap = require('bootstrap');


let store = createStore(userReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension():f=>f
));

ReactDOM.render(
    <div>
        <Provider store = {store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/jobs' component={Job}/>
                    <Route path='/login' component={LoginContainer}/>
                    <Route path='/register' component={RegisterContainer}/>
                    <Route path='/HR-profile' component={HRProfileContainer}/>
                    <Route path='/job/detail/:jobId' component={WidgetList}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    </div>
        , document.getElementById('root'));

