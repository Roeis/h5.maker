'use strict';
import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('width', {
    html : `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4 label-blue">
                        宽度
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="width" type="number">
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        this.$width = this.$el.find('[data-role="width"]');
    },
    bind(){
        this.$width.on('change.property', function(){
            stageData.curElem.style.width = this.value + 'px';
            render.logElemStep();
        });
    },
    callback(value){
        value = parseInt(value, 10);
        this.$el.show();
        this.$width.val(value);
    }
});
