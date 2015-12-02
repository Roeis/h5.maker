'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var task = new Task({
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        内间距
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="padding" type="number">
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        this.$padding = this.$el.find('[data-role="padding"]');
    },
    bind(){
        this.$padding.on('change.property', function(){
            stageData.curElem.child.style.padding = this.value + 'px';
            render.renderStep();
        });
    },
    register(){
        tasks.register('padding', (value) => {
            value = parseInt(value, 10);
            this.$el.show();
            this.$padding.val(value);
        });
    }
});
