/**
 * Created by AlexWang on 08/11/2016.
 */
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory,IndexRedirect } from 'react-router';
import Home from "./Home"

render((
    <Router history={hashHistory}>
        <Route path="/" component={Home}>
        </Route>
    </Router>
), document.getElementById('root'));