'use strict';
import util from '../biz/util.js';

var core = {

    init: function() {
        this._create();
        this._bind();
    },
    /**
     * 创建右键
     * @return {[type]} [description]
     */
    _create: function(){
        var html = `<div class="menu" style="display: none;">
                    </div>`;
        this.$elem = $(html);
        $('body').append(this.$elem);
    },

    _bind: function() {
        
    },

};

module.exports = core;