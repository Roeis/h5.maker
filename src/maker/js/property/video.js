'use strict';
import task from './task.js';
import stageData from '../data/stageData.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        video
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="video">
                    </div>
                </div>
            </div>`;

task.$el.append(html);

var $video = task.$el.find('[data-role="video"]');

task.register('video', function(value){
    // console.log('%c video here', 'color: #f00', value);
    $video.val(value);
});
