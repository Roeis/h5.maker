'use strict';
import React from 'react';

require('./style.scss');

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