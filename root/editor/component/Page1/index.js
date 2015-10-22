'use strict';
import React from 'react';

// require('./style.scss');

class Page extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
            <div className="list">
                this is page1 <br/>
                and it use react transform
            </div>
        );
    }
}

export class Page1 extends React.Component {
    render(){
        return (
            <Page />
        );
    }
}