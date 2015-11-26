'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var task = new Task({
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        audio
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

    },
    register(){
        let self = this;
        tasks.register('audio', function(value){
            self.$el.show();
            self.$audio.val(value);
        });
    }
});
