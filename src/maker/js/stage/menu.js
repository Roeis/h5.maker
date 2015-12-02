'use strict';
import util         from '../biz/util.js';
import render       from '../page/render.js';
import watchlist    from '../page/watchlist.js';
import history      from '../stage/history.js';
import operation    from './operation.js';

var core = {

    init() {
        this.createMenu();
        this.bindMenu();
    },
    /**
     * 创建右键
     * @return {[type]} [description]
     */
    createMenu(){
        var html = `<div class="menu" id="contextMenu" style="display: none;">
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
                                <span class="glyphicon glyphicon-trash"></span> 删除
                            </li>
                        </ul>
                    </div>`;
        this.$menu = $(html);
        $('body').append(this.$menu);
    },

    showContextmenu(event){
        var left, top;
        left = event.pageX - 20;
        top = event.pageY - 10;

        // handle when reach bottom
        var target_height = this.$menu.height();
        var offset = target_height + this.$menu.offset().top;
        var window_height = $(window).height();

        if(offset >= window_height){
            top = window_height - target_height - 20;
        }

        this.$menu.show().css({
            position: 'absolute',
            left: left,
            top: top
        });
    },

    bindMenu() {
        var self = this;
        util.$doc.on('contextmenu', '.device', function(event) {

            var $this = $(event.target);
            $this.trigger('click');

            self.showContextmenu(event);
            // 取消默认contextmenu
            return false;
        });

        util.$doc.on('click', function(event){
            var $this = $(event.target),
                isIn = $this.closest('#contextMenu').length > 0;
            if(!isIn){
                self.$menu.hide();
            }
        });

        self.$menu.find('[data-role="add-elem"]').on('click', function(){
            operation.addElem('element', 'base');
            self.callbackRender();
            history.pushStep();
        });

        self.$menu.find('[data-role="copy-elem"]').on('click', function(){
            operation.copyElem();
            self.callbackRender();
        });

        self.$menu.find('[data-role="paste-elem"]').on('click', function(){
            operation.pasteElem();
            self.callbackRender();
        });

        self.$menu.find('[data-role="remove-elem"]').on('click', function(){
            operation.removeElem();
            self.callbackRender();
        });
    },

    callbackRender(){
        watchlist.render();
        render.renderPage();
        this.$menu.hide();
    }
};

module.exports = core;
