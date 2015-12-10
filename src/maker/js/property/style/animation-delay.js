'use strict';
import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        延时
                    </div>
                    <div class="col-md-8">
                        <input type="number" class="form-control animation-delay" min="0" step="0.1" />
                    </div>
                </div>
            </div>`;
tasks.register('animation-delay', {
    html: html,
    target: '#animaPanel',
    init(){
        this.$delay = this.$el.find('.animation-delay');
    },
    bind(){
        this.$delay.on('change.property', function(){
            stageData.curElem.style['animation-delay'] = this.value + 's';
            render.logElemStep();
        });
    },
    callback(value){
        this.$el.show();
        value = parseFloat(value);
        this.$delay.val(value);
    }
});
