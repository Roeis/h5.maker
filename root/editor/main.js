'use strict';
import React from 'react';
import ReactDom from 'react-dom';


import { Router, Route, Link } from 'react-router';
import { createHistory, useBasename } from 'history';

import { NotFound } from './component/NotFound';
import { Header } from './component/Header';
import { Page1 } from './component/Page1';
import { Page2 } from './component/Page2';
import { Kanban } from './kanban';

const history = useBasename(createHistory)({
    basename: ''
})

require('./style/base.scss');
require('./style/style.scss');

class App extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <Header />
                <div className="wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const routes = {
    path: '/',
    component: App,
    childRoutes: [
        {path: 'page1', component: Page1},
        {path: 'page2', component: Page2},
        {path: 'kanban', component: Kanban},
        {path: '*', component: NotFound}
    ]
}

ReactDom.render(
    <Router history={history} routes={routes} />,
    document.getElementById('app')
)

