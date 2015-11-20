'use strict';
import task     from './task.js';
import stageData     from '../model/stageData.js';
import animas   from '../biz/animas.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        duration
                    </div>
                    <div class="col-md-8">
                        <input type="number" class="form-control" data-role="animation-duration"></input>
                    </div>
                </div>
            </div>
            <div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        delay
                    </div>
                    <div class="col-md-8">
                        <input type="number" class="form-control" data-role="animation-delay"></input>
                    </div>
                </div>
            </div>`;
    html += `<div class="edit-group">
                <div class="row">`;
    for (var key in animas){
        if (animas.hasOwnProperty(key)) {
            html += `<div class="anima anima-${key}" data-opacity="${animas[key].opacity}" data-value="${key}">
                    <div class="${key}">${animas[key].cn}</div>
                </div>`;
        }
    }
    html += `</div>
            </div>`;

task.$el.append(html);

var $duration = task.$el.find('[data-role="animation-duration"]'),
    $delay = task.$el.find('[data-role="animation-delay"]');
task.register('animation', function(value){
    value = value.split(' ');
    // wobble       1s         ease       2s
    // name      duration    time-func   delay
    var name = value[0],
        duration = parseFloat(value[1]),
        delay = parseFloat(value[3]);

    $duration.val(duration);
    $delay.val(delay);

    console.log('%canimation:', 'color: #f00', name, duration, delay);
});