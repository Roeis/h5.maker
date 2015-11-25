'use strict';
import task from './task.js';
import stageData from '../data/stageData.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        audio
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="audio">
                    </div>
                </div>
            </div>`;

task.$style.append(html);

var $audio = task.$el.find('[data-role="audio"]');

task.register('audio', function(value){
    // console.log('%c audio here', 'color: #f00', value);
    $audio.val(value);
});
