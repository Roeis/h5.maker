'use strict';
import task from './task.js';
import stageData from '../data/stageData.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        analyze
                    </div>
                    <div class="col-md-8">
                        <input placeholder="please enter your analyze key" class="form-control" data-role="analyze">
                    </div>
                </div>
            </div>`;

task.$style.append(html);

var $analyze = task.$el.find('[data-role="analyze"]');

task.register('analyze', function(value){
    // console.log('%c analyze here', 'color: #f00', value);
    $analyze.val(value);
});
