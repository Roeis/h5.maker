'use strict';
import _ from 'lodash';
import util from '../biz/util.js';

var $width = $('[data-role="width"]'),
    $height = $('[data-role="height"]'),

    $transform = $('[data-role="transform"]'),

    $left = $('[data-role="left"]'),
    $top = $('[data-role="top"]');

var events = {
    width: function(value){
        value = parseInt(value, 10);
        $width.val(value);
    },
    height: function(value){
        value = parseInt(value, 10);
        $height.val(value);
    },
    left: function(value){
        value = parseInt(value, 10);
        $left.val(value);
    },
    top: function(value){
        value = parseInt(value, 10);
        $top.val(value);
    },
    transform: function(value){
        console.log(value)
        value = value.match(/\-?\d+/)[0];
        $transform.val(value);
    },
    color: function(value){
        // console.log(value);
    },
};

events['background-image'] = function(value){
    // console.log(value);
};
events['background-color'] = function(value){
    // console.log(value);
};
events['text-align'] = function(value){
    
    console.log(value);
};
events['vertical-align'] = function(value){
    // console.log(value);
};
events['border-radius'] = function(value){
    console.log(value);
};

var core = {
    sync: function(style){
        _.forEach(style, function(value, key){
            core.syncValue(key, value);
        });
    },
    syncValue: function(key, value){
        if(!events[key]) return;
        events[key](value);
    },
    bind: function(stage){
        console.log(stage)
        $transform.on('change.input', function(){
            stage.curElem.childStyle.transform = 'rotate('+ this.value +'deg)';
            stage.render();
        });
    }
};

module.exports = core;