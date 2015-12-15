'use strict';
import pageData    from '../../data/pageData.js';

import tasks        from '../tasks.js';

tasks.register('isloop', {
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        循环模式
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="isloop">
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        this.$element = this.$el.find('[data-role="isloop"]');
    },
    bind(){
        this.$element.on('change.property', function(){
            pageData.setting.isloop = this.value;
        });
    },
    callback(value){
        this.$el.show();
        this.$element.val(value);
    }
});
