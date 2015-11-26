'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var task = new Task({
    html : `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        rotate
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="transform" type="number">
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        this.$target = this.$el.find('[data-role="transform"]');
    },
    bind(){
        /*
         * example:
         * bind event to change the property
         * then call render.renderStep to log the step, that includes
         * add a step into history storage, and then render the template
         * with the changed data
         */
        this.$target.on('change.input', function(){

            stageData.curElem.child.style.transform = 'rotate('+ this.value +'deg)';

            render.renderStep();
        });
    },
    register(){
        /**
         * register a value callback function
         * get a value of some property, how to handle with the value,
         * it'll be called by sync function that sync up the data
         */
        tasks.register('transform', (value) => {
            value = value.match(/\-?\d+/)[0];
            this.$el.show();
            this.$target.val(value);
        });
    }
});
