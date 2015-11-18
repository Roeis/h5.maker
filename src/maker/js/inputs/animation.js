'use strict';
import task from './task.js';
import Data from '../model/data.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-8">
                        动画模块
                    </div>
                </div>
            </div>`;

task.$el.append(html);


task.register('animation', function(value){
   
    console.log('##animation##', value);
});