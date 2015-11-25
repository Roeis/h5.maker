'use strict';

import _            from 'lodash';
import task         from './task.js';
import util         from '../biz/util.js';

task.init();

var files = [
    // property
    'link',
    'audio',
    'video',
    'analyze',
    // child element
    'innerHtml',
    // css
    'text',
    'color',
    'background',
    'transform',
    'borderadius',
    'padding',
    'zindex',
    'size',
    'position',
    //
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
        if(!task.events[key]){
            return;
        }
        task.events[key](value);
    },
};

module.exports = core;
