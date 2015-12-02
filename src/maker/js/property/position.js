'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var task = new Task({
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        距左
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="left" type="number">
                    </div>
                </div>
            </div>
            <div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        距上
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="top" type="number">
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        this.$left = this.$el.find('[data-role="left"]');
        this.$top = this.$el.find('[data-role="top"]');
    },
    bind(){
        this.$left.on('change.property', function(){
            stageData.curElem.style.left = this.value + 'px';
            render.renderStep();
        });
        this.$top.on('change.property', function(){
            stageData.curElem.style.top = this.value + 'px';
            render.renderStep();
        });
    },
    register(){
        tasks.register('left', (value) => {
            value = parseInt(value, 10);
            this.$el.show();
            this.$left.val(value);
        });
        tasks.register('top', (value) => {
            value = parseInt(value, 10);
            this.$el.show();
            this.$top.val(value);
        });
    }
});
