'use strict';
import util from '../biz/util.js';

var core = {

    init: function() {
        this.createMenu();
        this.bindMenu();
    },
    /**
     * 创建右键
     * @return {[type]} [description]
     */
    createMenu: function(){
        var html = `<div class="menu" style="display: none;">
                        <ul class="list-unstyled">
                            <li data-role="edit">
                                <span class="glyphicon glyphicon-pencil"></span>
                                编辑
                            </li>
                            <li data-role="copy">
                                <span class="glyphicon glyphicon-copy"></span>
                                复制
                                <span class="tip">Ctrl+C</span>
                            </li>
                            <li data-role="paste">
                                <span class="glyphicon glyphicon-paste"></span>
                                粘贴
                                <span class="tip">Ctrl+V</span>
                            </li>
                            <li data-role="moveup">
                                <span class="glyphicon glyphicon-chevron-up"></span>
                                上移一层
                            </li>
                            <li data-role="movedown">
                                <span class="glyphicon glyphicon-chevron-down"></span>
                                下移一层
                            </li>
                            <li data-role="delete">
                                <span class="glyphicon glyphicon-trash"></span> 删除
                            </li>
                        </ul>
                    </div>`;
        this.$elem = $(html);
        $('body').append(this.$elem);
    },

    showContextmenu: function(event){
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
    bindMenu: function() {
        var self = this;
        util.$doc.on('contextmenu', '.device', function(event) {

            // var $this = $(event.target);
            // $this.trigger('click');

            self.showContextmenu(event);
            // 取消默认contextmenu
            return false;
        });

        self.$elem.find('[data-role="copy"]').on('click', function(){
            console.log('copy');
        });
        self.$elem.find('[data-role="paste"]').on('click', function(){
            console.log('copy');
        });
    },

};

module.exports = core;
