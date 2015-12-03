'use strict';
import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('left', {
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        距左
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" min="0" data-role="left" type="number">
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        this.$left = this.$el.find('[data-role="left"]');
    },
    bind(){
        this.$left.on('change.property', function(){
            stageData.curElem.style.left = this.value + 'px';
            render.renderStep();
        });
    },
    callback(value){
        value = parseInt(value, 10);
        this.$el.show();
        this.$left.val(value);
    }
});
