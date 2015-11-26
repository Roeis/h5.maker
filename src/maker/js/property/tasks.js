'use strict';
import _ from 'lodash';

// make a factory that other property can extend it
//
//

var core = {

    events: {},
    // 注册一个事件
    register(name, callback){
        // 注册一个新的任务
        let task = {};
        task[name] = callback;
        _.extend(this.events, task);

        // events[name](value);
    },

    init(){
        this.create();
        this.bind();
    },

    create(){
        let html = `<div class="edit-panel-tab cf">
                        <div class="edit-panel-li active">属性</div>
                        <div class="edit-panel-li">动画</div>
                    </div>
                    <div class="edit-panel-cont">
                        <div class="edit-panel" id="stylePanel" style="display: block;"></div>
                        <div class="edit-panel" id="animaPanel" style="display: none;"></div>
                    </div>`;
        let $el = $('#editPanel');
        $el.html(html);

        this.$tab = $el.find('.edit-panel-tab');
        this.$cont = $el.find('.edit-panel-cont');
    },

    bind(){
        let self = this;
        this.$tab.on('click', '.edit-panel-li', function(){
            let index = $(this).index();
            self.$tab.children().eq(index).addClass('active').siblings().removeClass('active');
            self.$cont.children().eq(index).show().siblings().hide();
        });
    }
};

module.exports = core;
