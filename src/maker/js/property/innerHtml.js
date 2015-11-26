'use strict';

import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var task = new Task({
    html : `<div class="edit-group">
                <div class="row">
                    <div class="col-md-12">
                        <textarea class="innerHtml"></textarea>
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        this.$text = this.$el.find('.innerHtml');
    },
    bind(){
        this.$text.on('change.property', function(){
            stageData.curElem.child.innerHtml = this.value;
            render.renderStep();
        });
    },
    register(){
        tasks.register('innerHtml', (value) => {
            this.$el.show();
            this.$text.val(value);
        });
    }
});
