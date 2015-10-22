'use strict';
import React from 'react';

require('./style.scss');

const notes = '';

class List extends React.Component{
    constructor(){
        super();
        this.state = {
            notes: [
                {
                    id: '353s5',
                    text: 'teststst'
                },
                {
                    id: '353asdf',
                    text: 'this is the second text'
                },
                {
                    id: '353s5sdfasd',
                    text: 'this is the third text'
                },
                {
                    id: '353s5sdfasd',
                    text: 'this is asdffsf'
                }
            ]
        }
    }
    render(){
        let notes = this.state.notes;
        return (
            <div>
                <ul>{
                    notes.map(this.renderLi)
                }</ul>
            </div>
        )
    }
    renderLi(elem, index){
        return <li key={index}>{`es6 string: ${elem.text}`}</li>
    }
}


class Page extends React.Component {
    constructor(){
        super();
        this.state = {
            text: 'input here'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        this.setState({
            text: e.target.value
        });
    }
    render(){
        return(
            <div className="page2">
                this is page 2 <br/>
                <List />
                <div className="syncText">
                    <input type="text" onChange={this.handleSubmit} value={this.state.text} />
                    <br />
                    <div className="copytext">
                        {this.state.text}
                    </div>
                </div>
            </div>
        );
    }
}

export class Page2 extends React.Component {
    render(){
        return (
            <Page />
        );
    }
}