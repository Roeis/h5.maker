'use strict';
import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('top', {
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4 label-blue">
                        距上
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="top" type="number">
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        this.$top = this.$el.find('[data-role="top"]');
    },
    bind(){
        this.$top.on('change.property', function(){
            stageData.curElem.style.top = this.value + 'px';
            render.logElemStep();
        });
    },
    callback(value){
        value = parseInt(value, 10);
        this.$el.show();
        this.$top.val(value);
    }
});
