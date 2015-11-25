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
import operation    from './operation.js';

window.theData = stageData;

var core = {
    init() {

        hotkey.init();
        menu.init();
        toolbar.init();
        operation.init();

        this.bindEvent();

    },

    bindEvent() {
        util.$doc.on('dblclick', '.device', (event) => {
            console.log('alert editor');
        });
        this.handleSingleClick();
    },

    handleSingleClick(){
        let self = this;
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

            if($temp){
                $temp.addClass('cur');
                self.intoEditable($temp);
                self.syncProperty();
                self.syncRole();
                console.log(stageData.curElem.type);
            }

            menu.$elem.hide();
        });
    },

    clearCurUi: function(){
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
            zIndex: 9,
            start: function() {
            },
            drag: function(event, ui) {
            },
            stop: function(event, ui) {
                _.extend(stageData.curElem.style, {
                    left: ui.position.left + 'px',
                    top: ui.position.top + 'px'
                });
                render.renderStep();
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
                render.renderStep();
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

    syncRole(){
        let curElem = stageData.curElem;
        switch(curElem.type){
            case 'audio':
                console.log(curElem.extra[curElem.type]);
                break;
            case 'video':

                break;
            case 'link':
                console.log(curElem.extra[curElem.type]);
                break;
            case 'default':
                console.log('do nothing');
                break;
            case 'jump':
                break;
            case 'extra':
                break;
            default:
                break;
        }
    },

    syncProperty(){
        let target = stageData.curElem;
        property.sync(target.style);
        property.sync(target.child);
        property.sync(target.child.style);
        property.sync(target.extra);
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

module.exports = core;
