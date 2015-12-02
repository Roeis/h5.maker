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
                        背景图片
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" data-role="bg-image">
                    </div>
                </div>
            </div>
            <div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        背景尺寸
                    </div>
                    <div class="col-md-8">
                        <div class="btn-group elem-bg-size" role="group">
                            <a class="btn btn-default" data-value="auto 100%">
                                高度100%
                            </a>
                            <a class="btn btn-default" data-value="100% auto">
                                宽度100%
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        背景颜色
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
        this.$size = this.$el.find('.elem-bg-size');
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

        this.$size.on('click', 'a', function(){
            let value = $(this).data('value');
            console.log(value);
            stageData.curElem.child.style['background-size'] = value;
            render.renderStep();
        });
    },
    register(){
        tasks.register('background-color', (value) => {
            this.$el.show();
            controller.set(value);
        });

        tasks.register('background-image', (value) => {
            value = value.match(/\((.*)\)/);
            if(value) value = value[1];
            this.$image.val(value);
        });

        tasks.register('background-size', (value) => {
            console.log(value);
            console.log()
            this.$size.children().removeClass('btn-active').end()
                .find(`[data-value="${value}"]`).addClass('btn-active');
        });
    }
})
