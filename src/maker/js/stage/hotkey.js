'use strict';
import _            from 'lodash';
import key          from '../biz/key.js';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render';
import watchlist    from '../page/watchlist.js';
import operation    from './operation.js';
import history      from './history.js';

var core = {

    init() {
        document.onkeydown = this.keyboardEvent;
    },

    /**
     *  mac 平台， windows 平台的快捷键
     *
     */
    keyboardEvent(event) {
        let e = event || window.event;

        let curElem = stageData.curElem,
            top, left;
        if(stageData.isFocusText){
            return;
        }

        if(curElem){
            top = parseInt(curElem.style.top, 10);
            left = parseInt(curElem.style.left, 10);
        }

        let CTRL    = e.ctrlKey,
            SHIFT   = e.shiftKey,
            ALT     = e.altKey,
            Z       = e.keyCode === key.Z,
            Y       = e.keyCode === key.Y,
            C       = e.keyCode === key.C,
            V       = e.keyCode === key.V,
            UP      = e.keyCode === key.Up,
            DOWN    = e.keyCode === key.Down,
            LEFT    = e.keyCode === key.Left,
            RIGHT   = e.keyCode === key.Right;

        // 复制
        if(CTRL && C){
            operation.copyElem();
            render.renderPage();
            watchlist.render();
        }

        // 粘贴
        if(CTRL && V){
            operation.pasteElem();
            render.renderPage();
            watchlist.render();
        }

        // 保存
        if(CTRL && e.keyCode === key.S){
            console.log('save');
        }

        //撤销
        if(CTRL && Z){
            history.undo(function(data){
                pageData.list[stageData.index] = _.cloneDeep(data);
                render.renderPage();
            });
        }

        //重做
        if(CTRL && Y){
            history.redo(function(data){
                pageData.list[stageData.index] = _.cloneDeep(data);
                render.renderPage();
            });
        }


        if(UP || DOWN){
            let t = top;
            t = UP ? t - 1 : t;
            t = DOWN ? t + 1 : t;
            t = SHIFT && UP ? t - 9 : t;
            t = SHIFT && DOWN ? t + 9 : t;
            if(t !== top){
                stageData.curElem.style.top = t + 'px';
                render.renderStep();
            }
        }

        if(LEFT || RIGHT){
            let l = left;
            l = LEFT ? l - 1 : l;
            l = RIGHT ? l + 1 : l;
            l = SHIFT && LEFT ? l - 9 : l;
            l = SHIFT && RIGHT ? l + 9 : l;
            if(l !== left){
                stageData.curElem.style.left = l + 'px';
                render.renderStep();
            }
        }
    }
};

module.exports = core;
