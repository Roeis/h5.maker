'use strict';
import React        from 'react';
import ReactDom     from 'react-dom';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

import {Picker, controller}     from '../../component/colorPickerBG.js';
tasks.register('background-color', {
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        背景颜色
                    </div>
                    <div class="col-md-8">
                        <div class="colorpicker" id="bgPicker"></div>
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        ReactDom.render(
            <Picker />,
            document.getElementById('bgPicker')
        );
    },
    callback(value){
        this.$el.show();
        controller.set(value);
    }
});
