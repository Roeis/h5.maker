'use strict';

import _            from 'lodash';
import task         from './task.js';


var files = [
    // property
    'link',
    'audio',
    'video',
    'analyze',
    // css
    'text',
    'transform',
    'borderadius',
    'background',
    'animation',
    'zindex',
    'size',
    'position',
];

for(var i = 0; i < files.length; i++){
    require('./'+files[i]+ '.js');
}

var core = {
    // 同步样式数据
    sync: function(obj){
        _.forEach(obj, function(value, key){
            core.syncValue(key, value);
        });
    },
    // 
    syncValue: function(key, value){
        if(!task.events[key]){
            return;
        }
        task.events[key](value);
    },
};

module.exports = core;