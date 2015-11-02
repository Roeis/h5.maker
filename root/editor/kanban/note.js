'use strict';
import React from 'react';
// 单个note
export class Note extends React.Component {
    constructor(){
        super()

        this.state = {
            editing: false
        }
        this.edit = this.edit.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.finishEdit = this.finishEdit.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderNote = this.renderNote.bind(this);
        this.renderRemove = this.renderRemove.bind(this);
    }
    renderEdit(){
        return (
            <input type="text" 
                onBlur={this.finishEdit}
                autoFocus="true"
                defaultValue={this.props.text}
                onKeyPress={this.checkEnter} />
        )
    }
    renderRemove(){
        return (
            <button onClick={this.props.onRemove}>remove</button>
        )
    }
    renderNote(){
        const onRemove = this.props.onRemove;

        return (
            <div onClick={this.edit}>
                {this.props.text}
                {
                    onRemove ? this.renderRemove() : null
                }
            </div>
        )
    }
    render(){
        const editing = this.state.editing;
        return(
            <div>
                {editing ? this.renderEdit() : this.renderNote()}
            </div>
        )
    }
    checkEnter(e){
        if(e.key === 'Enter'){
            this.finishEdit(e);
        }
    }
    finishEdit(e){
        this.props.onEdit(e.target.value);
        this.setState({
            editing: false
        })
    }
    edit(){
        this.setState({
            editing: true
        })
    }
}