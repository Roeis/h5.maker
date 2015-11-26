'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var task = new Task({
    html : `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        width
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="width" type="number">
                    </div>
                </div>
            </div>
            <div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        height
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="height" type="number">
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        this.$width = this.$el.find('[data-role="width"]');
        this.$height = this.$el.find('[data-role="height"]');
    },
    bind(){
        this.$width.on('change.property', function(){
            stageData.curElem.style.width = this.value + 'px';
            render.renderStep();
        });

        this.$height.on('change.property', function(){
            stageData.curElem.style.height = this.value + 'px';
            render.renderStep();
        });
    },
    register(){
        tasks.register('width', (value) => {
            value = parseInt(value, 10);
            this.$el.show();
            this.$width.val(value);
        });

        tasks.register('height', (value) => {
            value = parseInt(value, 10);
            this.$height.val(value);
        });

    }
});
