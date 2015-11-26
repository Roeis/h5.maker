'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var task = new Task({
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        video
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="video">
                    </div>
                </div>
            </div>`,
    parent: '#stylePanel',
    init(){
        this.$video = this.$el.find('[data-role="video"]');
    },
    bind(){

    },
    register(){
        let self = this;
        tasks.register('video', function(value){
            self.$el.show();
            self.$video.val(value);
        });
    }
});
