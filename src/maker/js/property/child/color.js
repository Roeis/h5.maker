'use strict';
import React        from 'react';
import ReactDom     from 'react-dom';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

import {Picker, controller}     from '../../component/colorPickerText.js';

tasks.register('color', {
    html : `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        文本颜色
                    </div>
                    <div class="col-md-8">
                        <div class="colorpicker" id="textPicker"></div>
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        ReactDom.render(
            <Picker name="color"/>,
            document.getElementById('textPicker')
        );
    },
    callback(value){
        this.$el.show();
        controller.set(value);
    }
});
