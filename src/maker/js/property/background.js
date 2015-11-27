'use strict';
import React        from 'react';
import ReactDom     from 'react-dom';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

import {Picker, controller}     from '../component/colorPickerBG.js';

var task = new Task({
    html: `<div class="edit-group">
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
            </div>`,
    parent: '#stylePanel',
    init(){
        // background-image
        this.$image = this.$el.find('[data-role="bg-image"]');
        // react color picker
        ReactDom.render(
            <Picker />,
            document.getElementById('bgPicker')
        );
    },
    bind(){

        this.$image.on('change.property', function(){
            stageData.curElem.child.style['background-image'] = 'url(' + this.value + ')';
            render.renderStep();
        });
    },
    register(){
        let self = this;
        tasks.register('background-color', function(value){
            self.$el.show();
            controller.set(value);
        });

        tasks.register('background-image', function(value){
            self.$el.show();
            value = value.match(/\((.*)\)/);
            if(value) value = value[1];
            self.$image.val(value);
        });
    }
})
