'use strict';

import _            from 'lodash';
import util         from '../biz/util.js';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render';
import property     from '../property';

import hotkey       from './hotkey.js';
import menu         from './menu.js';
import toolbar      from './toolbar.js';

window.theData = stageData;

var core = {
    init: function() {

        hotkey.init();
        menu.init();
        toolbar.init();

        this.bindEvent();

        stageData.countID = pageData.global.count + 1;

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
                    stageData.curElems = [];
                    stageData.curElems.push(id);

                    stageData.$curElem = $temp;
                    stageData.curElem = self.getById(id);
                    self.clearCurUi();
                }
            }else{
                stageData.curElems = [];
                self.clearCurUi();
            }

            console.log(stageData.curElems);

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
        var flag = _.includes(stageData.curElems, id);
        if(!flag){
            stageData.curElems.push(id);
        }

    },

    multiCallback: function(){
        stageData.curElems.each(function(index, elem){
            var id = elem;
        });
        //
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
                _.assign(stageData.curElem.style, {
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
                _.assign(stageData.curElem.style, {
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

    syncProperty: function(){
        var target = stageData.curElem;
        if(!target) {
            return;
        }
        property.sync(target.style);
        property.sync(target.childStyle);
        property.sync(target.extra);
        property.sync(target.innerHtml);
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

};

module.exports = core;
