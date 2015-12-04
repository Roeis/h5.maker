'use strict';
import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

var html = `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4" title="跳转某一页面">
                        跳转
                    </div>
                    <div class="col-md-8">
                        <input type="number" min="0" placeholder="enter page number" class="form-control" data-role="jump">
                    </div>
                </div>
            </div>`;
tasks.register('jump', {
    html : html,
    target: '#stylePanel',
    init(){
        this.$jump = this.$el.find('[data-role="jump"]');
    },
    bind(){
        this.$jump.on('change.property', function(){
            stageData.curElem.extra.jump = this.value;
            render.renderStep();
        });
    },
    callback(value){
        this.$el.show();
        this.$jump.val(value);
    }
});
