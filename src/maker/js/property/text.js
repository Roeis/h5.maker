'use strict';
import task         from './task.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';

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
                            <div class="btn-group align-horizontal" role="group">
                                <a class="btn btn-default" data-value="left">
                                    <span class="glyphicon glyphicon-align-left"></span>
                                </a>
                                <a class="btn btn-default" data-value="center">
                                    <span class="glyphicon glyphicon-align-center"></span>
                                </a>
                                <a class="btn btn-default" data-value="right">
                                    <span class="glyphicon glyphicon-align-right"></span>
                                </a>
                            </div>
                            <div class="btn-group align-vertical" role="group">
                                <a class="btn btn-default" data-value="top">
                                    居上
                                </a>
                                <a class="btn btn-default" data-value="middle">
                                    居中
                                </a>
                                <a class="btn btn-default" data-value="bottom">
                                    居下
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

task.$el.append(html);

// horizontal align text
var $horizontal = task.$el.find('.align-horizontal');

task.register('text-align', function(value){
    // console.log(value);
    $horizontal.children().removeClass('btn-active');
    $horizontal.find(`[data-value="${value}"]`).addClass('btn-active');
});

$horizontal.on('click', 'a', function(){
    var value = $(this).data('value');

    stageData.curElem.childStyle['text-align'] = value;
    render.renderStep();
});

// vertical align text
var $vertical = task.$el.find('.align-vertical');

task.register('vertical-align', function(value){
    // console.log(value);
    $vertical.children().removeClass('btn-active');
    $vertical.find(`[data-value="${value}"]`).addClass('btn-active');
});

$vertical.on('click', 'a', function(){
    var value = $(this).data('value');
    stageData.curElem.childStyle['vertical-align'] = value;
    render.renderStep();
});


task.register('color', function(value){
    // console.log('%ccolor:', 'color: #f00', value);
});
