'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var task = new Task({
    html: `<div class="edit-group">
            <div class="row">
                <div class="col-md-4">
                    analyze
                </div>
                <div class="col-md-8">
                    <input placeholder="please enter your analyze key" class="form-control" data-role="analyze">
                </div>
            </div>
        </div>`,
    parent: '#stylePanel',
    init(){
        this.$analyze = this.$el.find('[data-role="analyze"]');
    },
    bind(){

    },
    register(){
        let self = this;
        tasks.register('analyze', function(value){
            self.$el.show();
            self.$analyze.val(value);
        });
    }
});
