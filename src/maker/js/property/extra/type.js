'use strict';

import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-12">
                        <div class="elem-character">
                            <a class="btn btn-default" data-value="link">链接</a>
                            <a class="btn btn-default" data-value="audio">音频</a>
                            <a class="btn btn-default" data-value="video">视频</a>
                            <a class="btn btn-default" data-value="jump">跳转</a>
                            <a class="btn btn-default" data-value="default">默认</a>
                        </div>
                    </div>
                </div>
            </div>`;

tasks.register('type', {
    html: html,
    target: '#stylePanel',
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
    callback(value){
        this.$el.show();
        this.$type.find('a').removeClass('active').end()
            .find(`[data-value="${value}"]`).addClass('active');
    }
});
