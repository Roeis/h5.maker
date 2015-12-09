'use strict';
import stageData    from '../../data/stageData.js';
import render       from '../../page/render.js';
import tasks        from '../tasks.js';

tasks.register('video', {
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        视频
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="video" placeholder="输入视频链接">
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        this.$video = this.$el.find('[data-role="video"]');
    },
    bind(){
        this.$video.on('change.property', function(){
            //check this value if it's ok
            // do something
            stageData.curElem.extra.video = this.value;
            render.renderStep();
        });
    },
    callback(value){
        this.$el.show();
        this.$video.val(value);
    }
});
