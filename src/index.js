import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Job from './containers/job/job'
import WidgetList from './containers/WidgetList/WidgetList'
import Home from './containers/homepage/homepage'
import './config/config'

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
const bootstrap = require('bootstrap');


document.body.style = 'background: black;';
ReactDOM.render(
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/jobs' component={Job}/>
                <Route path='/job/detail/:jobId' component={WidgetList}/>
            </Switch>
        </BrowserRouter>
    </div>
        , document.getElementById('root'));

