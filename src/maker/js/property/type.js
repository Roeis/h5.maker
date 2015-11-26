'use strict';

import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var html = `<div class="edit-group">
            <div class="row">
                <div class="col-md-12">
                    <div class="elem-character">
                        <a class="btn btn-default" data-value="link">link</a>
                        <a class="btn btn-default" data-value="audio">audio</a>
                        <a class="btn btn-default" data-value="video">video</a>
                        <a class="btn btn-default" data-value="jump">jump</a>
                        <a class="btn btn-default" data-value="default">default</a>
                    </div>
                </div>
            </div>
        </div>`;

var link = new Task({
    html: html,
    parent: '#stylePanel',
    init(){
        this.$type = this.$el.find('.elem-character');
    },
    bind(){
        this.$type.on('click', 'a', function(){
            let value = $(this).data('value');
            stageData.curElem.type = value;

            // meet some special value to change the innerHtml
            // switch(value){
            //     case 'video':
            //         stageData.curElem.child.innerHtml = `<video src="http://www.hujinag.com"></video>`;
            //         break;
            //     default:
            //         break;
            // }
            render.renderStep();
        });
    },
    register: function(){

        tasks.register('type', (value) => {
            this.$el.show();
            this.$type.find('a').removeClass('active').end()
                .find(`[data-value="${value}"]`).addClass('active');
        });
    }
});
