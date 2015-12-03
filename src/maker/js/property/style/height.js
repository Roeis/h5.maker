'use strict';
import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('height', {
    html : `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        高度
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="height" type="number">
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        this.$height = this.$el.find('[data-role="height"]');
    },
    bind(){
        this.$height.on('change.property', function(){
            stageData.curElem.style.height = this.value + 'px';
            render.renderStep();
        });
    },
    callback(value){
        value = parseInt(value, 10);
        this.$el.show();
        this.$height.val(value);
    }
});
