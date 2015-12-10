'use strict';
import _            from 'lodash';
import util         from '../biz/util.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import elemlist    from '../page/elemlist.js';
import history      from '../stage/history.js';
import operation    from './operation.js';

var core = {

    init() {
        this._createMenu();
        this._bindMenu();
    },
    /**
     * 创建右键
     * @return {[type]} [description]
     */
    _createMenu(){
        let html = `<div class="menu" id="contextMenu" style="display: none;">
                        <ul class="list-unstyled">
                            <li data-role="add-elem">
                                <span class="glyphicon glyphicon-plus"></span>
                                新建
                            </li>
                            <li data-role="copy-elem">
                                <span class="glyphicon glyphicon-copy"></span>
                                复制
                            </li>
                            <li data-role="paste-elem">
                                <span class="glyphicon glyphicon-paste"></span>
                                粘贴
                            </li>
                            <li data-role="remove-elem">
                                <span class="glyphicon glyphicon-trash"></span>
                                删除
                            </li>
                        </ul>
                    </div>`;
        this.$menu = $(html);
        util.$body.append(this.$menu);
    },

    _showContextmenu(event){
        let left = event.pageX - 20,
            top = event.pageY - 10;

        // handle when reach bottom
        let target_height = this.$menu.height(),
            offset = target_height + this.$menu.offset().top,
            window_height = util.$window.height();

        if(offset >= window_height){
            top = window_height - target_height - 20;
        }

        this.$menu.show().css({
            position: 'absolute',
            left: left,
            top: top
        });
    },

    _bindMenu() {
        let self = this,
            $device = $('.device');

        util.$doc.on('contextmenu', '.device', function(event) {

            let $this = $(event.target);
            $this.trigger('click');

            self._showContextmenu(event);
            // 取消默认contextmenu
            return false;
        });

        util.$doc.on('click', function(event){
            let $this = $(event.target),
                isIn = $this.closest('#contextMenu').length > 0;
            if(!isIn){
                self.$menu.hide();
            }
        });

        this.$menu
            .on('click', '[data-role="add-elem"]', function(event){

                let offset = $device.offset(),
                    left = event.pageX - offset.left,
                    top = event.pageY - offset.top;

                operation.addElem('element', 'base', function(elem){
                    self._resetPos(elem, left, top);
                });
                self._callbackRender();
                history.pushStep();
            }).on('click', '[data-role="copy-elem"]', function(){
                operation.copyElem();
                self.$menu.hide();
            }).on('click', '[data-role="paste-elem"]', function(event){
                let offset = $device.offset(),
                    left = event.pageX - offset.left,
                    top = event.pageY - offset.top;
                operation.pasteElem(function(clone){
                    self._resetPos(clone, left, top);
                });
                self._callbackRender();
                history.pushStep();
            }).on('click', '[data-role="remove-elem"]', function(){
                operation.removeElem();
                self._callbackRender();
                history.pushStep();
            });
    },

    _resetPos(obj, left, top){
        let middle = parseInt(obj.style.width) / 2,
            center = parseInt(obj.style.height) / 2;
        _.extend(obj.style, {
            left: left - middle + 'px',
            top: top - center + 'px'
        });
    },

    _callbackRender(){
        elemlist.render();
        render.renderHtmlPage(stageData.index);
        this.$menu.hide();
    }
};

module.exports = core;
