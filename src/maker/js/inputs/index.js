'use strict';

import _            from 'lodash';
import task         from './task.js';
import text         from './text.js';
import transform    from './transform.js';
import size         from './size.js';
import position     from './position.js';
import background   from './background.js';
import animation    from './animation.js';

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