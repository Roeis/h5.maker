'use strict';
import pageData    from '../../data/pageData.js';

import tasks        from '../tasks.js';

tasks.register('template', {
    html: `<div class="edit-group">
                <div class="row">
                    <div class="col-md-4">
                        模板类型
                    </div>
                    <div class="col-md-8">
                        <input class="form-control" data-role="template">
                    </div>
                </div>
            </div>`,
    target: '#stylePanel',
    init(){
        this.$template = this.$el.find('[data-role="template"]');
    },
    bind(){
        this.$template.on('change.property', function(){
            pageData.setting.template = this.value;
        });
    },
    callback(value){
        this.$el.show();
        this.$template.val(value);
    }
});
