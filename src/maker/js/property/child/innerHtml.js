'use strict';

import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('innerHtml', {
    html : `<div class="edit-group edit-text-editor">
                <div class="row">
                    <div class="col-md-12">
                        <div class="cf" id="textEditorBar">
                            <span class="ql-format-group">
                                <select title="Size" class="ql-size">
                                    <option value="12px">12</option>
                                    <option value="14px">14</option>
                                    <option value="16px">16</option>
                                    <option value="18px">18</option>
                                    <option value="24px">24</option>
                                    <option value="32px">32</option>
                                    <option value="36px">36</option>
                                    <option value="48px">48</option>
                                </select>

                                <span title="Bold" class="ql-format-button ql-bold"></span>
                                <span title="Italic" class="ql-format-button ql-italic"></span>
                                <span title="Underline" class="ql-format-button ql-underline"></span>
                                <span title="Strikethrough" class="ql-format-button ql-strike"></span>

                                <select title="Text Color" class="ql-color">
                                    <option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)" selected></option>
                                    <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
                                    <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
                                    <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
                                    <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
                                    <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
                                </select>
                                <select title="Background Color" class="ql-background">
                                    <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>
                                </select>

                                <select title="Text Alignment" class="ql-align">
                                    <option value="left" label="Left" selected></option>
                                    <option value="center" label="Center"></option>
                                    <option value="right" label="Right"></option>
                                    <option value="justify" label="Justify"></option>
                                </select>
                            </span>
                            <span class="ql-format-group">
                                <span title="Link" class="ql-format-button ql-link"></span>
                                <span title="Image" class="ql-format-button ql-image"></span>
                            </span>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="innerHtml" id="textEditor"></div>
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        this.editor = new Quill('#textEditor', {
            styles: false,
            modules: {
                'toolbar': {container: '#textEditorBar'},
                'link-tooltip': true,
                'image-tooltip': true
            },
            theme: 'snow'
        });
        this.editor.on('text-change', function(delta, source){
            console.log(source);
            console.log(delta);
        });
        // this.$code = this.$el.find('.codeOrigin');
    },
    bind(){
        this.$el.find('.ql-editor').on('blur', function(){
            let html = stageData.curElem.child.innerHtml;
            if(html !== this.innerHTML){
                stageData.curElem.child.innerHtml = this.innerHTML;
                render.logElemStep();
            }
        });

    },
    callback(value){
        this.$el.show();
        // this.$text.html(value);
        this.editor.setHTML(value);
    }
});
