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
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="innerHtml" id="textEditor" contenteditable></div>
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        this.$text = this.$el.find('.innerHtml');
    },
    bind(){
        this.$text.on('blur', function(){
            let html = stageData.curElem.child.innerHtml;
            if(html !== this.innerHTML){
                stageData.curElem.child.innerHtml = this.innerHTML;
                render.renderStep();
            }
        });
        window.range = null;
        this.$text.on('mouseup', function(){
            // var range = document.createRange();

            // if (window.getSelection) {
                // rangeObj = window.getSelection();
            // }
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);

            let start = range.startOffset,
                end = range.endOffset;

            // range.setStart(selection.anchorNode, start);
            // range.setEnd(selection.anchorNode, end);
            //
            // console.log(range);
            // // cache string
            // let targetStr = range.toString();
            //
            // console.log(range.toString());

            // create an new node for injection
            // let node = document.createElement('span');
            // node.className = 'select-word';
            // node.innerHTML = range.toString();

            //delete origin content, then insert node
            // range.deleteContents();

            // if(targetStr){
            //     range.insertNode(node);
            // }

            // console.log(node, start, end);

        });

    },
    register(){
        tasks.register('innerHtml', (value) => {
            this.$el.show();
            this.$text.html(value);
        });
    }
});
