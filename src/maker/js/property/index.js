'use strict';

import _            from 'lodash';
import util         from '../biz/util.js';
import tasks        from './tasks.js';

var files = [
    // character
    'extra/type',
    'extra/link',
    'extra/audio',
    'extra/video',
    'extra/analyze',
    'extra/jump',
    // child style
    'child/innerHtml',
    'child/color',
    'child/transform',
    'child/font-size',
    'child/text-align',
    'child/vertical-align',
    'child/background-color',
    'child/background-image',
    'child/background-size',
    'child/border-radius',
    'child/padding',
    // elem style
    'style/zindex',
    'style/left',
    'style/top',
    'style/width',
    'style/height',
    'style/animation-duration',
    'style/animation-delay',
    'style/animation-name',
];

var core = {
    
    init(){
        this._create();
        this._bind();

        //加载和注册属性的事件和DOM
        for(let i = 0; i < files.length; i++){
            require('./'+files[i]+ '.js');
        }
        this.$inputs = this.$el.find('.edit-group');
    },

    _create(){
        let html = `<div class="edit-panel-tab cf">
                        <div class="edit-panel-li active">属性</div>
                        <div class="edit-panel-li">动画</div>
                    </div>
                    <div class="edit-panel-cont">
                        <div class="edit-panel" id="stylePanel" style="display: block;"></div>
                        <div class="edit-panel" id="animaPanel" style="display: none;"></div>
                    </div>`;
        this.$el = util.$property.html(html);

        this.$tab = this.$el.find('.edit-panel-tab');
        this.$cont = this.$el.find('.edit-panel-cont');
    },

    _bind(){
        let self = this;
        this.$tab.on('click', '.edit-panel-li', function(){
            let index = $(this).index();
            self.$tab.children().eq(index).addClass('active').siblings().removeClass('active');
            self.$cont.children().eq(index).show().siblings().hide();
        });
    },

    sync(obj){
        _.forEach(obj, (value, key) => {
            this.syncValue(key, value);
        });
    },

    // 同步样式数据
    syncValue(key, value){
        if(tasks.events[key]){
            tasks.events[key](value);
        }
    },

    unSyncAll(){
        this.$inputs.hide();
    }
};

module.exports = core;
