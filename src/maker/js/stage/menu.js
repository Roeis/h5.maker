'use strict';
import _            from 'lodash';
import util         from '../biz/util.js';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import render       from '../page/render.js';
import watchlist    from '../page/watchlist.js';

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
        this.$elem = $(html);
        $('body').append(this.$elem);
    },

    showContextmenu(event){
        var left, top;
        left = event.pageX - 20;
        top = event.pageY - 10;

        // handle when reach bottom
        var target_height = this.$elem.height();
        var offset = target_height + this.$elem.offset().top;
        var window_height = $(window).height();

        if(offset >= window_height){
            top = window_height - target_height - 20;
        }

        this.$elem.show().css({
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
                self.$elem.hide();
            }
        });

        self.$elem.find('[data-role="copy-elem"]').on('click', function(){
            self.copyElem();
            self.callbackRender();
        });
        self.$elem.find('[data-role="paste-elem"]').on('click', function(){
            self.pasteElem();
            self.callbackRender();
        });
        self.$elem.find('[data-role="remove-elem"]').on('click', function(){
            self.removeElem();
            self.callbackRender();
        });
    },

    callbackRender(){
        render.renderPage();
        watchlist.render();
        this.$elem.hide();
    },

    removeElem(){
        let current = pageData.list[stageData.index],
            index = _.findIndex(current.elements, {id: stageData.curElem.id});
        current.elements.splice(index, 1);
    },

    copyElem(){
        stageData.clone = stageData.curElem;
    },

    pasteElem(){
        let clone = _.cloneDeep(stageData.clone);
        stageData.countID ++;
        clone.id = 'm_' + stageData.countID;

        pageData.list[stageData.index].elements.push(clone);
    },
};

module.exports = core;
