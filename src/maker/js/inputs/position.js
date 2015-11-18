'use strict';
import task from './task.js';
import Data from '../model/data.js';

var html = `<div class="edit-group">
            <div class="row">
                <div class="col-md-2">left</div>
                <div class="col-md-10">
                    <input class="form-control" data-role="left" type="number">
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">top</div>
                <div class="col-md-10">
                    <input class="form-control" data-role="top" type="number">
                </div>
            </div>
        </div>`;

task.$el.append(html);

var $left = task.$el.find('[data-role="left"]');
var $top = task.$el.find('[data-role="top"]');
// this.$left = $('[data-role="left"]');
task.register('left', function(value){
    value = parseInt(value, 10);
    $left.val(value);
});

task.register('top', function(value){
    value = parseInt(value, 10);
    $top.val(value);
});