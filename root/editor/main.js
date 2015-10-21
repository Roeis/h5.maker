'use strict';
import React from 'react';
import ReactDom from 'react-dom';


import { Router, Route, Link } from 'react-router';
import { createHistory, useBasename } from 'history';

// import { NotFound } from './component/NotFound';

const history = useBasename(createHistory)({
    basename: ''
})

class App extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                app
                <div className="wrapper">
                    tsts
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const routes = {
  path: '/',
  component: App,
}

ReactDom.render(
    <Router history={history} routes={routes} />,
    document.getElementById('app')
)

