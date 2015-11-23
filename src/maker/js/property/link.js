'use strict';
import task from './task.js';
import stageData from '../data/stageData.js';
import render   from '../page/render.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        link
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="link">
                    </div>
                </div>
            </div>`;

task.$el.append(html);

var $link = task.$el.find('[data-role="link"]');

task.register('link', function(value){
    // console.log('%c link here', 'color: #f00', value);
    $link.val(value);
});

$link.on('change.property', function(){
    stageData.curElem.extra.link = this.value;
    render.renderStep();
});
