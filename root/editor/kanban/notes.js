'use strict';
import React from 'react';
import { Note } from './note.js';
// 单个note
export class Notes extends React.Component {
    constructor(props){
        super(props)
        this.renderNote = this.renderNote.bind(this);
    }
    renderNote(note, index){
        return (
            <li key={index}>
                <Note text={note.text} 
                    onRemove = {this.props.onRemove.bind(null, note.id)}
                    onEdit={this.props.onEdit.bind(null, note.id)} />
            </li>
        )
    }
    render(){
        const notes = this.props.notes;
        return (
            <div className="notes">
                <h3>this is note</h3>
                {notes.map(this.renderNote)}
            </div>
        )
    }
}