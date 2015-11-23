'use strict';
import _            from 'lodash';
import key          from '../biz/key.js';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render';
import history      from './history.js';

var core = {
    
    init: function() {
        document.onkeydown = this.keyboardEvent;
    },
    /**
     *  mac 平台， windows 平台的快捷键
     * 
     */
    keyboardEvent: function(event) {
        var e = event || window.event;
        
        // 复制
        if(e.ctrlKey && e.keyCode === key.C){
            console.log('copy');
        }

        // 粘贴
        if(e.ctrlKey && e.keyCode === key.V){
            console.log('paste');
        }

        // 剪贴
        if(e.ctrlKey && e.keyCode === key.X){
            console.log('cut');
        }

        // 保存
        if(e.ctrlKey && e.keyCode === key.S){
            console.log('save');
        }

        //自由变换
        if(e.ctrlKey && e.keyCode === key.T){
            console.log('transform');
        }

        //选取所有
        if(e.ctrlKey && e.keyCode === key.A){
            console.log('select all');
        }

        //撤销
        if(e.ctrlKey && e.keyCode === key.Z){
            console.log('undo');
            history.undo(function(data){

                pageData.list[0] = _.cloneDeep(data);
                render.renderPage();
            });
        }

        //重做
        if(e.ctrlKey && e.keyCode === key.Y){
            console.log('redo');
            history.redo(function(data){
                pageData.list[0] = _.cloneDeep(data);
                render.renderPage();
            });
        }

        if(e.keyCode === key.Up){
            console.log('up arrow');
        }
        if(e.keyCode === key.Right){
            console.log('right arrow');
        }
        if(e.keyCode === key.Down){
            console.log('down arrow');
        }
        if(e.keyCode === key.Left){
            console.log('left arrow');
        }
    }
};

module.exports = core;