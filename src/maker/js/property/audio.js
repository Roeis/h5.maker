'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var task = new Task({
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        音频
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="audio">
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        this.$audio = this.$el.find('[data-role="audio"]');
    },
    bind(){
        this.$audio.on('change.property', function(){
            stageData.curElem.extra.audio = this.value;
            render.renderStep();
        });
    },
    register(){
        tasks.register('audio', (value) => {
            this.$el.show();
            this.$audio.val(value);
        });
    }
});
