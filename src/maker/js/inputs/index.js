'use strict';

import _            from 'lodash';
import task         from './task.js';


var files = [
    'text',
    'transform',
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
    sync: function(style){
        _.forEach(style, function(value, key){
            core.syncValue(key, value);
        });
    },
    // 
    syncValue: function(key, value){
        if(!task.events[key]) return;
        task.events[key](value);
    },
};

module.exports = core;