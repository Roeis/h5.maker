'use strict';
import task from './task.js';
import stageData from '../data/stageData.js';
import render   from '../page/render.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        border-radius
                    </div>
                    <div class="col-md-8">
                        <input type="number" min="0" class="form-control" data-role="border-radius">
                    </div>
                </div>
            </div>`;

task.$el.append(html);

var $radius = task.$el.find('[data-role="border-radius"]');

task.register('border-radius', function(value){
    // console.log('%c border-radius here', 'color: #f00', value);
    value = parseInt(value, 10);
    $radius.val(value);
});

$radius.on('change.property', function(){
    stageData.curElem.childStyle['border-radius'] = this.value + 'px';
    render.renderStep();
});
