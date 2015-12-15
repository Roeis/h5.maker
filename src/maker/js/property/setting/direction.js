'use strict';
import pageData    from '../../data/pageData.js';

import tasks        from '../tasks.js';

tasks.register('direction', {
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        滑动方向
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="direction">
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        this.$element = this.$el.find('[data-role="direction"]');
    },
    bind(){
        this.$element.on('change.property', function(){
            pageData.setting.mode = this.value;
        });
    },
    callback(value){
        this.$el.show();
        this.$element.val(value);
    }
});
