'use strict';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import tasks        from './tasks.js';
import Task         from './task.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        jump
                    </div>
                    <div class="col-md-8">
                        <input type="number" min="0" placeholder="enter page number" class="form-control" data-role="jump">
                    </div>
                </div>
            </div>`;
var task = new Task({
    html : html,
    parent: '#stylePanel',
    init(){
        this.$jump = this.$el.find('[data-role="jump"]');
    },
    bind(){
        this.$jump.on('change.property', function(){
            stageData.curElem.extra.jump = this.value;
        });
    },
    register(){
        tasks.register('jump', (value) => {
            this.$jump.val(value);
        });
    }

});
