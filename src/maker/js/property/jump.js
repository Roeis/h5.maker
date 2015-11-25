'use strict';
import task from './task.js';
import stageData from '../data/stageData.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        jump
                    </div>
                    <div class="col-md-8">
                        <input placeholder="enter page number u wanna jump" class="form-control" data-role="jump">
                    </div>
                </div>
            </div>`;

task.$style.append(html);

var $jump = task.$el.find('[data-role="jump"]');

task.register('jump', function(value){
    // console.log('%c jump here', 'color: #f00', value);
    $jump.val(value);
});
