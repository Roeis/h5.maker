'use strict';

import _ from 'lodash';
import pageData from '../model';
import elements from '../model/elements';
import render from '../page/render';
import util from '../biz/util.js';
import hotkey from './hotkey.js';
import menu from './menu.js';
import back from './back.js';
import input from './input.js';
import operation from './operation.js';
window.back = back;

var SCREEN_WIDTH = 360,
    SCREEN_HEIGHT = 540;

var countID = 0;

//stage中的变量对象
var core = {

    $curElem: null,
    $copyElement: null,

    curElem: null,
    curElems: [],

    init: function() {
        hotkey.init();
        menu.init();

        this.bindEvent();
        input.bind(core);
        this.render();
        countID = pageData.global.idx + 1;
        console.log(countID);
    },
    bindEvent: function() {
        var self = this;

        util.$doc.on('dblclick', '.device', (event) => {
            console.log('alert editor');
        });
        self.handleSingleClick();
        // toolbar
        util.$doc.on('click', '.toolbar-elem', function(){
            
            var elem = _.cloneDeep(elements.defaultElem);
            elem.id = 'm_' + countID ++;

            pageData.list[0].elements.push(elem);
            console.log(pageData);
            // var html = `<div class="elem editable" id="${id}">
            //                 test
            //             </div>`;
            // $('.page').eq(0).append(html);
        });
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
                    self.curElems = [];
                    self.curElems.push(id);

                    self.$curElem = $temp;
                    self.curElem = self.getById(id);
                    self.clearCurUi();
                }
            }else{
                self.curElems = [];
                self.clearCurUi();
            }

            console.log(self.curElems);

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
        var flag = _.includes(this.curElems, id);
        if(!flag){
            this.curElems.push(id);
        }

    },

    multiCallback: function(){
        this.curElems.each(function(index, elem){
            var id = elem;
        });
        //
    },

    getCurElem: function(){
        return this.$curElem;
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
                // console.log(ui.position);
                // core._calculatePos($obj, ui.position);
            },
            stop: function(event, ui) {
                _.assign(self.curElem.style, {
                    left: ui.position.left + 'px',
                    top: ui.position.top + 'px'
                });
                self.syncProperty();
                self.render();
                // core._resetPostion($obj, ui.position);
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
                _.assign(self.curElem.style, {
                    left: ui.position.left + 'px',
                    top: ui.position.top + 'px',
                    width: ui.size.width + 'px',
                    height: ui.size.height + 'px'
                });
                self.syncProperty();
                console.log(ui.size, ui.position);
                self.render();
                // core._resetPostion($obj, ui.position);
                // core._resetSize($obj, ui.size);
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
        var target = this.curElem;
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
        var it = this.$curElem;

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
        this.$curElem.css({
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
    render: function(){
        var self = this;
        render.renderPage(function(data){
            // 渲染当前页面， 返回素体HTML
            // 添加HTML到cache作为缓存，（暂定20步）
            //     添加回溯步骤，统一由本渲染方法来控制
            // 添加素体HTML后，执行UI初始化拖拽动作
            back.addStep(data);
            if(self.curElem){
                $('#'+self.curElem.id).trigger('click');
            }
        });
    }

};

module.exports = core;