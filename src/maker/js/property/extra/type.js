'use strict';

import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        元素角色
                    </div>
                    <div class="col-md-8">
                        <div class="btn-group" role="group" id="elem-play-role">
                            <div class="btn-group" role="group">
                                <button class="btn btn-default dropdown-toggle" type="button" id="elemPlayRole" data-toggle="dropdown">
                                    <span class="elem-play-role"></span>
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu elem-play-roles" aria-labelledby="elemPlayRole">
                                    <li data-value="default"><a>默认</a></li>
                                    <li data-value="link"><a>链接</a></li>
                                    <li data-value="audio"><a>音频</a></li>
                                    <li data-value="video"><a>视频</a></li>
                                    <li data-value="jump"><a>跳转</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

tasks.register('type', {
    html: html,
    target: '#stylePanel',
    init(){
        this.$role = this.$el.find('.elem-play-role');
        this.$roles = this.$el.find('.elem-play-roles');
    },
    bind(){
        this.$roles.on('click', 'li', function(){
            let value = $(this).data('value'),
                oldValue = stageData.curElem.type;
            if(oldValue !== value){
                stageData.curElem.type = value;
                render.logElemStep();
            }
        });
    },
    callback(value){
        this.$el.show();
        this.$role.html(value);
    }
});
