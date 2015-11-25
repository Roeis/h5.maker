'use strict';
import _ from 'lodash';

module.exports = {
    events: {},
    register(name, callback){
        let task = {};
        task[name] = callback;
        _.extend(this.events, task);
    },
    $el: $('#editPanel'),
    init(){
        this.create();
        this.bind();
    },
    create(){
        let html = `<div class="edit-panel-tab cf">
                        <div class="edit-panel-li active">样式</div>
                        <div class="edit-panel-li">动画</div>
                    </div>
                    <div class="edit-panel-cont">
                        <div class="edit-panel" id="stylePanel" style="display: block;"></div>
                        <div class="edit-panel" id="animaPanel" style="display: none;"></div>
                    </div>`;
        this.$el.html(html);
        this.$style = this.$el.find('#stylePanel');
        this.$anima = this.$el.find('#animaPanel');
        this.$tab = this.$el.find('.edit-panel-tab');
        this.$cont = this.$el.find('.edit-panel-cont');
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
