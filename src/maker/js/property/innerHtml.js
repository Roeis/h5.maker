'use strict';

import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var task = new Task({
    html : `<div class="edit-group">
                <div class="row">
                    <div class="col-md-12">
                        <div class="cf">
                            <a class="btn">B</a>
                            <a class="btn">I</a>
                            <a class="btn">U</a>
                            <a class="btn">S</a>
                            <a class="btn">F</a>
                            <a class="btn">L</a>
                            <a class="codeMirror">code</a>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="innerHtml" id="textEditor" contenteditable="true"></div>
                        <textarea class="codeOrigin" id="codeOrigin"></textarea>
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        this.$text = this.$el.find('.innerHtml');
        this.$code = this.$el.find('.codeOrigin');
        // this.editor = window.CodeMirror.fromTextArea(document.getElementById('codeOrigin'), {
        //     mode: 'text/html',
        //     // lineNumbers: true,
        //     // lineWrapping: true,
        //     selectionPointer: true
        // });
    },
    bind(){
        this.$text.on('blur', function(){
            let html = stageData.curElem.child.innerHtml;
            if(html !== this.innerHTML){
                stageData.curElem.child.innerHtml = this.innerHTML;
                render.renderStep();
            }
        });
    },
    register(){
        tasks.register('innerHtml', (value) => {
            this.$el.show();
            this.$text.html(value);
            // this.editor.setValue(value);
        });
    }
});
