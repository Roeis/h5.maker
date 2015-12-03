'use strict';
import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('transform', {
    html : `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        旋转
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="transform" type="number">
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        this.$target = this.$el.find('[data-role="transform"]');
    },
    bind(){
        /*
         * example:
         * bind event to change the property
         * then call render.renderStep to log the step, which includes
         * adding a step into history storage, and render the template
         * with the changed data
         */
        this.$target.on('change.input', function(){

            stageData.curElem.child.style.transform = 'rotate('+ this.value +'deg) translateZ(0)';
            render.renderStep();
        });
    },
    /**
     * hook value
     * get a value of some property, and handle with the value,
     * it'll be called by sync function which sync up the data
     */
    callback(value){
        value = value.match(/\-?\d+/)[0];
        this.$el.show();
        this.$target.val(value);
    }
});
