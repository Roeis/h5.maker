'use strict';
import React        from 'react';
import ReactDom     from 'react-dom';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

import {Picker, controller}     from '../component/colorPickerText.js';

var task = new Task({
    html : `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        color
                    </div>
                    <div class="col-md-8">
                        <div class="colorpicker" id="textPicker"></div>
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        ReactDom.render(
            <Picker />,
            document.getElementById('textPicker')
        );
    },
    bind(){

    },
    register(){
        tasks.register('color', (value) => {
            this.$el.show();
            controller.set(value);
        });
    }
});
