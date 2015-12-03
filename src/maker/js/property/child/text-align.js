'use strict';

import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('text-align', {
    html : `<div class="btn-group elem-text-align" role="group">
                <a class="btn btn-default" data-value="left">
                    <span class="glyphicon glyphicon-align-left"></span>
                </a>
                <a class="btn btn-default" data-value="center">
                    <span class="glyphicon glyphicon-align-center"></span>
                </a>
                <a class="btn btn-default" data-value="right">
                    <span class="glyphicon glyphicon-align-right"></span>
                </a>
            </div>`,
    target: '#elem-text-group',
    init(){
    },
    bind(){
        this.$el.on('click', 'a', function(){
            let value = $(this).data('value'),
                oldValue = stageData.curElem.child.style['text-align'];
            if(oldValue !== value){
                stageData.curElem.child.style['text-align'] = value;
                render.renderStep();
            }
        });
    },
    callback(value){
        this.$el.show().children().removeClass('btn-active').end()
            .find(`[data-value="${value}"]`).addClass('btn-active');
    }
});
