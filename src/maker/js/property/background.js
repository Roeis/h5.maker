'use strict';
import task         from './task.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import React        from 'react';
import ReactDom     from 'react-dom';

import {Picker, controller}     from '../component/bgcolor.picker.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        background image
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" data-role="bg-image">
                    </div>
                </div>
            </div>
            <div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        background color
                    </div>
                    <div class="col-md-8">
                        <div class="colorpicker" id="bgPicker"></div>
                    </div>
                </div>
            </div>`;

task.$style.append(html);


// react color picker
ReactDom.render(
    <Picker />,
    document.getElementById('bgPicker')
);

// background-color
// var $bgColor = task.$el.find('[data-role="bg-color"]');

task.register('background-color', function(value){
    controller.set(value);
    // $bgColor.val(value);
});


// background-image
var $image = task.$el.find('[data-role="bg-image"]');

task.register('background-image', function(value){
    value = value.match(/\((.*)\)/);
    if(value){
        value = value[1];
    }
    // console.log('%cbackground-image:', 'color: #f00', value);
    $image.val(value);
});

$image.on('change.property', function(){
    stageData.curElem.child.style['background-image'] = 'url(' + this.value + ')';
    render.renderStep();
});
