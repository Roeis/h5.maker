'use strict';
import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        循环
                    </div>
                    <div class="col-md-8">
                        <input type="number" class="form-control animation-iteration-count" min="1" step="1" />
                    </div>
                </div>
            </div>`;
tasks.register('animation-iteration-count', {
    html: html,
    target: '#animaPanel',
    init(){
        this.$count = this.$el.find('.animation-iteration-count');
    },
    bind(){
        this.$count.on('change.property', function(){
            stageData.curElem.style['animation-iteration-count'] = this.value;
            render.logElemStep();
        });
    },
    callback(value){
        this.$el.show();
        value = parseFloat(value);
        this.$count.val(value);
    }
});
