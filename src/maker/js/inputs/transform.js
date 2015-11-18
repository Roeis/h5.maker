'use strict';
import task     from './task.js';
import Data     from '../model/data.js';
import render   from '../page/render.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-5">
                        <input class="form-control" data-role="transform" type="number">
                    </div>
                </div>
            </div>`;

task.$el.append(html);

var $target = task.$el.find('[data-role="transform"]');

task.register('transform', function(value){
    value = value.match(/\-?\d+/)[0];
    $target.val(value);
    console.log(Data);
});

$target.on('change.input', function(){

    Data.curElem.childStyle.transform = 'rotate('+ this.value +'deg)';
    render.renderStep();
});