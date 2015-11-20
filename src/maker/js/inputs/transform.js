'use strict';
import task     from './task.js';
import stageData     from '../model/stageData.js';
import render   from '../page/render.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        transform
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="transform" type="number">
                    </div>
                </div>
            </div>`;

task.$el.append(html);

var $target = task.$el.find('[data-role="transform"]');

/**
 * register a value callback function
 * get a value of some property, how to handle with the value,
 * it'll be called by sync function that sync up the data
 */
task.register('transform', function(value){
    value = value.match(/\-?\d+/)[0];
    $target.val(value);
    console.log(stageData);
});

/*
    example: 
    bind event to change the property
    then call render.renderStep to log the step, that includes
    add a step into history storage, and then render the template 
    with the changed data
 */
$target.on('change.input', function(){

    Data.curElem.childStyle.transform = 'rotate('+ this.value +'deg)';

    render.renderStep();
});