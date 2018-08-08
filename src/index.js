import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Job from './containers/job/job'
import WidgetList from './containers/WidgetList/WidgetList'
import Home from './containers/homepage/homepage'
import LoginContainer from './containers/login/login'
import RegisterContainer from './containers/register/register'
import HRProfileContainer from './containers/HR-profile/HR-profile'
import ApplicantProfileContainer from './containers/applicant-profile/applicant-profile'
import Dashboard from './components/dashboard/dashboard'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import combineReducer from './reducers/combineReducer';
import {Provider} from 'react-redux'
import './config/config'

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
const bootstrap = require('bootstrap');


let store = createStore(combineReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension():f=>f
));


// 4 main pages: HR, applicant, self center, massage

// switch: once hit first one suitable option, render it and finish there. The rest of route will not be explored.
ReactDOM.render(
    <div>
        <Provider store = {store}>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/jobs' component={Job}/>
                        <Route path='/login' component={LoginContainer}/>
                        <Route path='/register' component={RegisterContainer}/>
                        <Route path='/HR-profile' component={HRProfileContainer}/>
                        <Route path='/Applicant-profile' component={ApplicantProfileContainer}/>
                        <Route path='/job/detail/:jobId' component={WidgetList}/>
                        <Route component={Dashboard}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    </div>
        , document.getElementById('root'));

