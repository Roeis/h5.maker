'use strict';
import task from './task.js';
import stageData from '../model/stageData.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        z-index
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="z-index">
                    </div>
                </div>
            </div>`;

task.$el.append(html);

var $zindex = task.$el.find('[data-role="z-index"]');

task.register('z-index', function(value){
    console.log('%cz-index', 'color: #f00', value);
    $zindex.val(value);
});