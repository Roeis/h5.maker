'use strict';
import React from 'react';
import ReactDom from 'react-dom';

class Page extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                oops , not found.
            <div>
        );
    }
}

export class NotFound extends React.Component {
    render(){
        return (
            <div >
                <Page />
            </div>
        );
    }
}