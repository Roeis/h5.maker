'use strict';
import util         from '../../biz/util.js';
import stageData    from '../../data/stageData.js';
import pageData     from '../../data/pageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('background-image', {
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4 label-blue">
                        背景图片
                    </div>
                    <div class="col-md-8">
                        <input type="text" placeholder="输入图片URL地址" class="form-control" data-role="bg-image">
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        this.$image = this.$el.find('[data-role="bg-image"]');
    },
    bind(){

        this.$image.on('change.property', function(){
            let role = stageData.curRole;

            switch (role) {
                case 'elem':
                    stageData.curElem.child.style['background-image'] = 'url(' + this.value + ')';
                    render.logElemStep();
                    break;
                case 'page':
                    pageData.list[stageData.index].style['background-image'] = 'url(' + this.value + ')';
                    render.logPageStep();
                    break;
                case 'global':
                    pageData.setting.style['background-image'] = 'url(' + this.value + ')';
                    util.$wrapper.attr('style', util.flatStyle(pageData.setting.style));
                    break;
                default:
                    break;

            }
        });
    },
    callback(value){
        value = value.match(/\((.*)\)/);
        if(value) {
            value = value[1];
        }
        this.$el.show();
        this.$image.val(value);
    }
});
