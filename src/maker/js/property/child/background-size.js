'use strict';
import stageData    from '../../data/stageData.js';
import pageData     from '../../data/pageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('background-size', {
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4 label-blue" title="宽大于高的图，选择高度100%">
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
            </div>`,
    target: '#stylePanel',
    init(){
        this.$size = this.$el.find('.elem-bg-size');
    },
    bind(){

        this.$size.on('click', 'a', function(){
            let value = $(this).data('value'),
                role = stageData.curRole;
            switch (role) {
                case 'elem':
                    let sizeElem = stageData.curElem.child.style['background-size'];
                    if(sizeElem !== value){
                        stageData.curElem.child.style['background-size'] = value;
                        render.logElemStep();
                    }
                    break;
                case 'page':
                    let sizePage = pageData.list[stageData.index].style['background-size'];
                    if(sizePage !== value){
                        pageData.list[stageData.index].style['background-size'] = value;
                        render.logPageStep();
                    }
                    break;
                case 'global':
                    break;
                default:
                    break;

            }
        });
    },
    callback(value){
        this.$el.show();
        this.$size.children().removeClass('btn-active').end()
            .find(`[data-value="${value}"]`).addClass('btn-active');
    }
});
