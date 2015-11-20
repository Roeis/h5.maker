'use strict';
import task from './task.js';
import stageData from '../model/stageData.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        width
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="width" type="number">
                    </div>
                </div>
            </div>
            <div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        height
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="height" type="number">
                    </div>
                </div>
            </div>`;

task.$el.append(html);

var $width = task.$el.find('[data-role="width"]');
var $height = task.$el.find('[data-role="height"]');

task.register('width', function(value){
    value = parseInt(value, 10);
    $width.val(value);
});

task.register('height', function(value){
    value = parseInt(value, 10);
    $height.val(value);
});