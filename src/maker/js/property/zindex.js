'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var task = new Task({
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        z-index
                    </div>
                    <div class="col-md-8">
                        <input type="number" min="0" class="form-control" data-role="z-index">
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        this.$zindex = this.$el.find('[data-role="z-index"]');
    },
    bind(){
        this.$zindex.on('change.property', function(){
            stageData.curElem.style['z-index'] = this.value;
            render.renderStep();
        });
    },
    register(){
        tasks.register('z-index', (value) => {
            this.$el.show();
            this.$zindex.val(value);
        });
    }
});
