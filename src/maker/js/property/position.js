'use strict';
import task         from './task.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">left</div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="left" type="number">
                    </div>
                </div>
            </div>
            <div class="edit-group">
                <div class="row">
                    <div class="col-md-4">top</div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="top" type="number">
                    </div>
                </div>
            </div>`;

task.$style.append(html);

// left
var $left = task.$style.find('[data-role="left"]');

task.register('left', function(value){
    value = parseInt(value, 10);
    $left.val(value);
});

$left.on('change.property', function(){
    stageData.curElem.style.left = this.value + 'px';
    render.renderStep();
});

// top
var $top = task.$style.find('[data-role="top"]');

task.register('top', function(value){
    value = parseInt(value, 10);
    $top.val(value);
});

$top.on('change.property', function(){
    stageData.curElem.style.top = this.value + 'px';
    render.renderStep();
});
