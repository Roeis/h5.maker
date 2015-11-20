'use strict';
import task         from './task.js';
import stageData    from '../model/stageData.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-12">
                        <div class="btn-group" role="group">
                            <div class="btn-group" role="group">
                                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownFont" data-toggle="dropdown">
                                    FontSize
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownFont">
                                    <li><a href="javascript:;">1</a></li>
                                    <li><a href="javascript:;">2</a></li>
                                    <li><a href="javascript:;">2.4</a></li>
                                    <li><a href="javascript:;">3</a></li>
                                </ul>
                            </div>
                            <div class="btn-group" role="group" data-role="align-horizontal">
                                <button type="button" class="btn btn-default" data-value="left">
                                    <span class="glyphicon glyphicon-align-left"></span>
                                </button>
                                <button type="button" class="btn btn-default" data-value="center">
                                    <span class="glyphicon glyphicon-align-center"></span>
                                </button>
                                <button type="button" class="btn btn-default" data-value="right">
                                    <span class="glyphicon glyphicon-align-right"></span>
                                </button>
                            </div>
                            <div class="btn-group" role="group" data-role="align-vertical">
                                <button type="button" class="btn btn-default" data-value="top">
                                    <span class="glyphicon glyphicon-object-align-top"></span>
                                </button>
                                <button type="button" class="btn btn-default" data-value="middle">
                                    <span class="glyphicon glyphicon-object-align-vertical"></span>
                                </button>
                                <button type="button" class="btn btn-default" data-value="bottom">
                                    <span class="glyphicon glyphicon-object-align-bottom"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

task.$el.append(html);

var $horizontal = task.$el.find('[data-role="align-horizontal"]');
var $vertical = task.$el.find('[data-role="align-vertical"]');

task.register('text-align', function(value){
    // console.log(value);
    $horizontal.find(`[data-value="${value}"]`).removeClass('btn-default');
});

task.register('vertical-align', function(value){
    // console.log(value);
    $vertical.find(`[data-value="${value}"]`).removeClass('btn-default');
});

task.register('color', function(value){
    console.log('%ccolor:', 'color: #f00', value);
});