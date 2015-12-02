'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

const text = {
    en : {
        name: 'analyze',
        placeholder: 'please enter your analyze name'
    },
    cn: {
        name: '统计',
        placeholder: '输入统计事件名'
    }
};
var langs = 'en';

var task = new Task({
    html: `<div class="edit-group">
            <div class="row">
                <div class="col-md-4">
                    ${text[langs].name}
                </div>
                <div class="col-md-8">
                    <input placeholder="${text[langs].placeholder}" class="form-control" data-role="analyze">
                </div>
            </div>
        </div>`,
    parent: '#stylePanel',
    init(){
        this.$analyze = this.$el.find('[data-role="analyze"]');
    },
    bind(){
        this.$analyze.on('change.property', function(){
            stageData.curElem.extra.analyze = this.value;
            render.renderStep();
        });
    },
    register(){
        let self = this;
        tasks.register('analyze', function(value){
            self.$el.show();
            self.$analyze.val(value);
        });
    }
});
