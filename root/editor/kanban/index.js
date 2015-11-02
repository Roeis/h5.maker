'use strict';
import React from 'react';
import { Notes } from './notes.js';

require('./style.scss');

const notes = [
        {
            id: 'id_01',
            text: 'teststst'
        },
        {
            id: 'id_02',
            text: 'this is the second text'
        },
        {
            id: 'id_03',
            text: 'this is the third text'
        },
        {
            id: 'id_04',
            text: 'this is asdff'
        }
    ];

export class Kanban extends React.Component {
    constructor(){
        super();
        this.state = {
            notes : notes
        };
        this.addNote = this.addNote.bind(this);
        this.editNote= this.editNote.bind(this);
        this.findNote = this.findNote.bind(this);
        this.removeNote = this.removeNote.bind(this);
    }
    addNote(){
        this.setState({
            notes: this.state.notes.concat([{
                id: 'testst',
                text: 'new work'
            }])
        })
    }
    findNote(id){
        const notes = this.state.notes;
        // use findIndex to get index to determine if it exist
        const noteIndex = notes.findIndex((note) => note.id === id);
        if(noteIndex < 0){
            console.warn('failed to find note', notes, id);
        }
        return noteIndex;
    }
    editNote(id, text){
        let notes = this.state.notes;
        const noteIndex = this.findNote(id);
        if(noteIndex < 0){
            return;
        }
        notes[noteIndex].text = text;
        this.setState({notes});
        console.log('note edit', id, text);
    }
    removeNote(id){
        const notes = this.state.notes;
        const noteIndex = this.findNote(id);
        if(noteIndex < 0){
            return;
        }
        this.setState({
            notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
        })
    }
    render(){
        const data = this.state.notes;
        return (
            <div>
                <Notes notes={data} onEdit={this.editNote} onRemove={this.removeNote}/>
                <button onClick={this.addNote}>add</button>
            </div>
        )
    }
}

