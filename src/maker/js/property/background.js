'use strict';
import task         from './task.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import util         from '../biz/util.js';

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
                        <div class="mini-color">
                            <input type="text" class="form-control" data-role="bg-color">
                        </div>
                    </div>
                </div>
            </div>`;

task.$el.append(html);

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
    stageData.curElem.childStyle['background-image'] = 'url(' + this.value + ')';
    render.renderStep();
});

// background-color
var $bgColor = task.$el.find('[data-role="bg-color"]');

$bgColor.minicolors({
    control: 'hue',
    theme: 'bootstrap',
    opacity: true,
    change: function(hex, opacity) {
        // console.log(hex, opacity);
        var rgba = $bgColor.minicolors('rgbaString');
        stageData.curElem.childStyle['background-color'] = rgba;
        render.renderStep();
    }
});

task.register('background-color', function(value){
    value = util.rgb2hex(value);
    $bgColor.minicolors('value', value.hex);
    $bgColor.minicolors('opacity', value.opacity);
});
