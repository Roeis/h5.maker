'use strict';

import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('font-size', {
    html : `<div class="edit-group">
                <div class="row">
                    <div class="col-md-12">
                        <div class="btn-group" role="group" id="elem-text-group">
                            <div class="btn-group" role="group">
                                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownFont" data-toggle="dropdown">
                                    <span class="elem-font-size"></span>
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu elem-font-sizes" aria-labelledby="dropdownFont">
                                    <li data-value="12"><a>12px</a></li>
                                    <li data-value="14"><a>14px</a></li>
                                    <li data-value="16"><a>16px</a></li>
                                    <li data-value="18"><a>18px</a></li>
                                    <li data-value="24"><a>24px</a></li>
                                    <li data-value="32"><a>32px</a></li>
                                    <li data-value="36"><a>36px</a></li>
                                    <li data-value="48"><a>48px</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        // horizontal align text
        this.$hori = this.$el.find('.align-horizontal');
        // vertical align text
        this.$vert = this.$el.find('.align-vertical');
        this.$fontsize = this.$el.find('.elem-font-size');
        this.$fontsizes = this.$el.find('.elem-font-sizes');
    },
    bind(){
        this.$fontsizes.on('click', 'li', function(){
            let value = $(this).data('value'),
                oldValue = stageData.curElem.child.style['font-size'];
            if(oldValue !== value){
                stageData.curElem.child.style['font-size'] = value + 'px';
                render.renderStep();
            }
        });
    },
    callback(value){
        this.$el.show();
        this.$fontsize.html(value);
    },
    register(){

        this.$vert.on('click', 'a', function(){
            let value = $(this).data('value'),
                oldValue = stageData.curElem.child.style['vertical-align'];
            if(oldValue !== value){
                stageData.curElem.child.style['vertical-align'] = value;
                render.renderStep();
            }
        });

        this.$hori.on('click', 'a', function(){
            let value = $(this).data('value'),
                oldValue = stageData.curElem.child.style['text-align'];
            if(oldValue !== value){
                stageData.curElem.child.style['text-align'] = value;
                render.renderStep();
            }
        });
        tasks.register('text-align', (value) => {
            this.$el.show();
            this.$hori.children().removeClass('btn-active').end()
                .find(`[data-value="${value}"]`).addClass('btn-active');
        });

        tasks.register('vertical-align', (value) => {
            this.$el.show();
            this.$vert.children().removeClass('btn-active').end()
                .find(`[data-value="${value}"]`).addClass('btn-active');
        });
    }
});
