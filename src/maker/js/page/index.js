'use strict';
// import ajax from './ajax.js';
import render       from './render.js';
import watchlist    from './watchlist.js';
import manager      from './manager.js';

var $page = $('#page');

var core = {

    init: function() {
        manager.init();
        watchlist.init();

        //渲染页面和管理页面, 包含了初始化页面滚动
        render.renderPage();
        render.pushHistory();
    }
};

module.exports = core;