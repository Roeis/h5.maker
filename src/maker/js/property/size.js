'use strict';
import task         from './task.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        width
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="width" type="number">
                    </div>
                </div>
            </div>
            <div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        height
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="height" type="number">
                    </div>
                </div>
            </div>`;

task.$style.append(html);

//width
var $width = task.$style.find('[data-role="width"]');

task.register('width', function(value){
    value = parseInt(value, 10);
    $width.val(value);
});

$width.on('change.property', function(){
    stageData.curElem.style.width = this.value + 'px';
    render.renderStep();
});

// height
var $height = task.$style.find('[data-role="height"]');

task.register('height', function(value){
    value = parseInt(value, 10);
    $height.val(value);
});

$height.on('change.property', function(){
    stageData.curElem.style.height = this.value + 'px';
    render.renderStep();
});
