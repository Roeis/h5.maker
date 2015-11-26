'use strict';

import _            from 'lodash';
import util         from '../biz/util.js';
import tasks        from './tasks.js';

tasks.init();

var files = [
    // character
    'type',
    'link',
    'audio',
    'video',
    'analyze',
    'jump',
    // style
    'innerHtml',
    'text',
    'color',
    'background',
    'transform',
    'borderadius',
    'padding',
    'zindex',
    'size',
    'position',
    'animation',
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

        console.log(tasks);
        $('.edit-group').hide();
    }
};

module.exports = core;
