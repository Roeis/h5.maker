'use strict';

import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var link = new Task({
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        链接
                    </div>
                    <div class="col-md-8">
                        <input placeholder="enter your link url" class="form-control" data-role="link">
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        this.$link = this.$el.find('[data-role="link"]');
    },
    bind(){
        this.$link.on('change.property', function(){
            // verify this.value
            stageData.curElem.extra.link = this.value;
            render.renderStep();
        });
    },
    register: function(){
        tasks.register('link', (value) => {
            this.$el.show();
            this.$link.val(value);
        });
    }
});
