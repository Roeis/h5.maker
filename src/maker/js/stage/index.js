'use strict';

import _ from 'lodash';
import util from '../biz/util.js';
import pageData from '../model';
import Data from '../model/data.js';
// import elements from '../model/elements';
// import page from '../page/';
import render from '../page/render';
import input from '../inputs';

import hotkey from './hotkey.js';
import menu from './menu.js';
import history from './history.js';
// import input from './input.js';
import toolbar from './toolbar.js';
// import operation from './operation.js';

window.theData = Data;
var SCREEN_WIDTH = 360,
    SCREEN_HEIGHT = 540;

//stage中的变量对象
var core = {
    init: function() {
        hotkey.init();
        menu.init();
        toolbar.init();
        render.renderStep();

        this.bindEvent();

        Data.countID = pageData.global.count + 1;
        
    },
    bindEvent: function() {
        var self = this;

        util.$doc.on('dblclick', '.device', (event) => {
            console.log('alert editor');
        });
        self.handleSingleClick();
    },
    handleSingleClick: function(){
        var self = this;
        util.$doc.on('click', '.device', (event) => {

            var $this = $(event.target),
                $parent = $this.closest('.editable'),
                isEditable = $parent.length > 0,
                isCurrent = $this.hasClass('editable'),
                $temp = null, id,
                e = event || window.event;

            
            // 选中元素时
            if(isEditable || isCurrent){
                $temp = isCurrent ? $this : $parent;
                id = $temp.attr('id');
                // 连选情况：插入选中元素
                if(e.shiftKey){
                    self.addCurElems(id);
                }else{
                    // 单选情况：选中单个
                    Data.curElems = [];
                    Data.curElems.push(id);

                    Data.$curElem = $temp;
                    Data.curElem = self.getById(id);
                    self.clearCurUi();
                }
            }else{
                Data.curElems = [];
                self.clearCurUi();
            }

            console.log(Data.curElems);

            if($temp){
                $temp.addClass('cur');
                self.intoEditable($temp);
                self.syncProperty();
            }

            menu.$elem.hide();
        });
    },

    clearCurUi: function(){
        $('.cur').removeClass('cur');
        this.destroyEditable();
    },

    addCurElems: function(id){
        var flag = _.includes(Data.curElems, id);
        if(!flag){
            Data.curElems.push(id);
        }

    },

    multiCallback: function(){
        Data.curElems.each(function(index, elem){
            var id = elem;
        });
        //
    },

    getCurElem: function(){
        return Data.$curElem;
    },

    intoEditable: function($obj){
        var self = this;
        $obj.draggable({
            containment: 'parent',
            grid: [2, 2],
            zIndex: 9,
            start: function() {
                
            },
            drag: function(event, ui) {
            },
            stop: function(event, ui) {
                _.assign(Data.curElem.style, {
                    left: ui.position.left + 'px',
                    top: ui.position.top + 'px'
                });
                self.syncProperty();
                render.renderStep();
            }
        });

        $obj.resizable({
            grid: [2, 2],
            containment: 'parent',
            handles: 'n, e, s, w, ne, se, sw, nw',
            resize: function(event, ui) {

                // core._initCssSize(ui.size.width, ui.size.height);
            },
            stop: function(event, ui) {
                _.assign(Data.curElem.style, {
                    left: ui.position.left + 'px',
                    top: ui.position.top + 'px',
                    width: ui.size.width + 'px',
                    height: ui.size.height + 'px'
                });
                self.syncProperty();
                render.renderStep();
            }
        });
    },

    destroyEditable: function(){
        // NM 当前页面的editable
        var $editables = $('.editable');

        $editables.each(function() {
            var $this = $(this);

            if( $this.draggable('instance') !== undefined ){
                $this.draggable('destroy');
            }
            // destroy the resizable instance
            if( $this.resizable('instance') !== undefined ){
                $this.resizable('destroy');
            }
        });
    },

    syncUi: function(){

    },

    syncProperty: function(){
        var target = Data.curElem;
        if(!target) return;
        input.sync(target.style);
        input.sync(target.childStyle);
    },

    getById: function(id){
        var target = null, it;
        for(let i = 0; i < pageData.list.length; i++){
            it = pageData.list[i].elements;
            // console.log(it);
            target = _.find(it, {'id': id});
            if(target){
                break;
            }
        }
        return target;
    },

    getPosition: function(){
        var it = Data.$curElem;

        var l = it.css('left'),
            t = it.css('top'),
            w = it.css('width'),
            h = it.css('height');
        return {
            left: parseInt(l),
            top: parseInt(t),
            width: parseInt(w),
            height: parseInt(h)
        };
    },

    setBottom: function(){
        var pos = this.getPosition();
        var l = SCREEN_WIDTH - pos.width,
            t = SCREEN_HEIGHT - pos.height;
        //temp test
        Data.$curElem.css({
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
    }

};

module.exports = core;