'use strict';
import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, Link } from 'react-router';
import { createHistory, useBasename } from 'history';

const history = useBasename(createHistory)({
    basename: ''
});

require('./style/style.scss');

class App extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                app
            </div>
        )
    }
}

const routes = {
    path: '/',
    component: App
}

ReactDom.render(
    <Router history={history} routes={routes} />,
    document.getElementById('app')
)