'use strict';

import _            from 'lodash';
import util         from '../biz/util.js';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import elemlist    from '../page/elemlist.js';
import render       from '../page/render.js';
import property     from '../property';

import hotkey       from './hotkey.js';
import contextMenu  from './contextMenu.js';
import topbar       from './topbar.js';
import operation    from './operation.js';

window.stageData = stageData;
window.pageData = pageData;

var core = {
    init() {

        contextMenu.init();
        hotkey.init();
        operation.init();
        topbar.init();
        property.init();

        this._bindEvent();

    },

    _bindEvent() {
        util.$doc.on('dblclick', '.device', (event) => {
            console.log('alert editor');
        });
        this.handleSingleClick();
        this.handleFocusText();
    },

    handleSingleClick(){
        let self = this;
        // 点击范围：在模拟设备的尺寸中
        util.$doc.on('click', '.stage-inner', (event) => {

            let $this = $(event.target),
                $parent = $this.closest('.editable'),
                isEditable = $parent.length > 0,
                isCurrent = $this.hasClass('editable'),
                $temp = null,
                $page = null,
                id,
                e = event || window.event;

            console.log('%cclick', 'color: #f50');
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
                // stageData.index
                $page = $('.page').eq(stageData.index);
                stageData.curElems = [];
                self.clearCurUi();
            }

            // 选中当前元素
            if($temp){
                $temp.addClass('cur');
                self.intoEditable($temp);
                self.syncElem();
                self.syncElemRole();

                elemlist.renderStatus(id);
            }

            if($page){
                $page.addClass('cur');
                self.syncPage();
            }

            contextMenu.$menu.hide();
        });

    },

    handleFocusText(){
        util.$doc.find('input, .ql-editor')
            .on('focus', function(){
                stageData.isFocusText = true;
            })
            .on('blur',function(){
                stageData.isFocusText = false;
            });
    },

    clearCurUi(){
        $('.cur').removeClass('cur');
        this.destroyEditable();
    },

    addCurElems(id){
        let flag = _.includes(stageData.curElems, id);
        if(!flag){
            stageData.curElems.push(id);
        }

    },

    intoEditable($obj){
        $obj.draggable({
            containment: 'parent',
            grid: [2, 2],
            // zIndex: 9,
            start: function() {
            },
            drag: function(event, ui) {
            },
            stop: function(event, ui) {
                _.extend(stageData.curElem.style, {
                    left: ui.position.left + 'px',
                    top: ui.position.top + 'px'
                });
                render.logElemStep();
            }
        });

        $obj.resizable({
            grid: [2, 2],
            containment: 'parent',
            handles: 'n, e, s, w, ne, se, sw, nw',
            resize: function(event, ui) {
            },
            stop: function(event, ui) {
                _.extend(stageData.curElem.style, {
                    left: ui.position.left + 'px',
                    top: ui.position.top + 'px',
                    width: ui.size.width + 'px',
                    height: ui.size.height + 'px'
                });
                render.logElemStep();
            }
        });
    },

    destroyEditable(){
        // NM 当前页面的editable
        let $editables = $('.editable');

        $editables.each(function() {
            let $this = $(this);

            if( $this.draggable('instance') !== undefined ){
                $this.draggable('destroy');
            }
            // destroy the resizable instance
            if( $this.resizable('instance') !== undefined ){
                $this.resizable('destroy');
            }
        });
    },

    syncElemRole(){
        let curElem = stageData.curElem;
        // style, child.innerHtml, child.style, extra
        // syncValue('link', curElem.extra.link);
        switch(curElem.type){
            case 'audio':
                property.syncValue('audio', curElem.extra.audio);
                break;
            case 'video':
                property.syncValue('video', curElem.extra.video);
                break;
            case 'link':
                property.syncValue('link', curElem.extra.link);
                property.syncValue('analyze', curElem.extra.analyze);
                break;
            case 'jump':
                property.syncValue('jump', curElem.extra.jump);
                break;
            default:
                break;
        }
    },

    syncElem(){
        let curElem = stageData.curElem;
        stageData.curRole = 'elem';
        property.unSyncAll();
        property.sync(curElem.style);
        property.sync(curElem.child.style);
        property.syncValue('innerHtml', curElem.child.innerHtml);
        property.syncValue('type', curElem.type);
    },

    syncPage(){
        let pageStyle = pageData.list[stageData.index].style;
        stageData.curRole = 'page';
        property.unSyncAll();
        property.sync(pageStyle);
    },

    getById(id){
        let target = null, it;
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
window.stage = core;
module.exports = core;
