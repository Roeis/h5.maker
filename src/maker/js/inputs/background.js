'use strict';
import task from './task.js';
import Data from '../model/data.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-8">
                        <input type="text" class="form-control" data-role="bg-image">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <input type="text" class="form-control" data-role="bg-color">
                    </div>
                </div>
            </div>`;

task.$el.append(html);

var $image = task.$el.find('[data-role="bg-image"]');
var $color = task.$el.find('[data-role="bg-color"]');
task.register('background-image', function(value){
    value = value.match(/\((.*)\)/);
    if(value){
        value = value[1];
    }
    console.log(value);
    $image.val(value);
});
task.register('background-color', function(value){
   
    console.log(value);
    $color.val(value);
});