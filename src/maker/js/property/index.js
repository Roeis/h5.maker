'use strict';

import _            from 'lodash';
import util         from '../biz/util.js';
import tasks        from './tasks.js';

tasks.init();

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

for(let i = 0; i < files.length; i++){
    require('./'+files[i]+ '.js');
}

var core = {
    // 同步样式数据
    sync(obj){
        _.forEach(obj, function(value, key){
            if(!util.isObject(value)) {
                core.syncValue(key, value);
            }
        });
    },

    //
    syncValue(key, value){
        if(!tasks.events[key]){
            return;
        }
        tasks.events[key](value);
    },

    unSyncAll(){

        // console.log(tasks);
        $('.edit-group').hide();
    }
};

module.exports = core;
