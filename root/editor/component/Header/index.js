'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link } from 'react-router';

require('./style.scss');

class Page extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
            <header>
                <li><Link to = '/page1'>link1</Link></li>
                <li><Link to = '/page2'>link2</Link></li>
                <li><Link to = '/kanban'>kanban</Link></li>
            </header>
        );
    }
}
export class Header extends React.Component {
    render(){
        return (
            <Page />
        );
    }
}