import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Login from './containers/login/login'
import Register from './containers/register/register'
import HRProfile from './containers/HR-profile/HR-profile'
import Job from './containers/job/job'
import WidgetList from './containers/WidgetList/WidgetList'
import AuthRoute from './components/auth-route/auth-route'
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

function HR(){
    return <h2>HR</h2>
}

ReactDOM.render(

        <BrowserRouter>
            <div className="container">
                <Route path='/jobs' component={Job}></Route>
                <Route path='/job/detail/:jobId' component={WidgetList}></Route>
            </div>
        </BrowserRouter>
        , document.getElementById('root'));

