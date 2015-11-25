'use strict';
import task         from './task.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-12">
                        <textarea class="innerHtml"></textarea>
                    </div>
                </div>
            </div>`;

task.$style.append(html);

var $textarea = task.$style.find('textarea');

task.register('innerHtml', function(value){
    console.log(value);
    $textarea.val(value);
});

$textarea.on('change.property', function(){
    stageData.curElem.child.innerHtml = this.value;
    render.renderStep();
});
