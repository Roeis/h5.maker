'use strict';

import _        from 'lodash';
import util     from '../biz/util.js';

/**
 *
 * 多元素 水平居中， 居左， 居右
 * 多元素 垂直居中， 居左， 居右
 *
 * 单元素 自动调整
 * 多元素 自动调整
 *
 * 单元素 拷贝 剪切 粘贴
 *
 */
var core = {

    alignHorizontal: function(){

    },

    alignVertical: function(){

    },

    alignCallback: function(){

    },

    align: function(direction){
        switch(direction){
            case 'up':
                break;
            case 'right':
                break;
            case 'down':
                break;
            case 'left':
                break;
        }
    },

    setBottom: function(){
        var pos = this.getPosition();
        var l = SCREEN_WIDTH - pos.width,
            t = SCREEN_HEIGHT - pos.height;
        //temp test
        stageData.$curElem.css({
            left: l,
            top: t
        });
    },

    autoAdjust: function(){
        var pos = this.getPosition();

        var w = util.tofixed10(pos.width),
            h = util.tofixed10(pos.height),
            l = util.tofixed10(pos.left),
            t = util.tofixed10(pos.top);
        console.log(w, h, l ,t);

        // render page
    },



};

module.exports = core;
