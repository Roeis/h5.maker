'use strict';

import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('vertical-align', {
    html : `<div class="btn-group elem-vertical-align" role="group">
                <a class="btn btn-default" data-value="top">
                    居上
                </a>
                <a class="btn btn-default" data-value="middle">
                    居中
                </a>
                <a class="btn btn-default" data-value="bottom">
                    居下
                </a>
            </div>`,
    target: '#elem-text-group',
    init(){
    },
    bind(){
        this.$el.on('click', 'a', function(){
            let value = $(this).data('value'),
                oldValue = stageData.curElem.child.style['vertical-align'];
            if(oldValue !== value){
                stageData.curElem.child.style['vertical-align'] = value;
                render.renderStep();
            }
        });
    },
    callback(value){
        this.$el.show()
            .children().removeClass('btn-active').end()
            .find(`[data-value="${value}"]`).addClass('btn-active');
    }
});
