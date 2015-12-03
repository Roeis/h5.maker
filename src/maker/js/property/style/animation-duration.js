'use strict';
import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        时长
                    </div>
                    <div class="col-md-8">
                        <input type="number" class="form-control animation-duration" min="0" step="0.1" />
                    </div>
                </div>
            </div>`;
tasks.register('animation-duration', {
    html: html,
    target: '#animaPanel',
    init(){
        this.$duration = this.$el.find('.animation-duration');
    },
    bind(){
        this.$duration.on('change.property', function(){
            stageData.curElem.style['animation-duration'] = this.value + 's';
            render.renderStep();
        });
    },
    callback(value){
        this.$el.show();
        value = parseFloat(value);
        this.$duration.val(value);
    }
});
