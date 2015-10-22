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
    }
    addNote(){
        this.setState({
            notes: this.state.notes.concat([{
                id: 'testst',
                text: 'new work'
            }])
        })
    }
    editNote(id, text){
        console.log('note edit', id, text);
    }
    render(){
        const data = this.state.notes;
        return (
            <div>
                <Notes notes={data} onEdit={this.editNote}/>
                <button onClick={this.addNote}>add</button>
            </div>
        )
    }
}

