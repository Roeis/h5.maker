'use strict';
// import ajax from './ajax.js';
import stageData    from '../data/stageData.js';
import pageData     from '../data/pageData.js';
import history      from '../stage/history.js';

import render       from './render.js';
import watchlist    from './watchlist.js';
import manager      from './manager.js';

var core = {

    init() {

        // get Data
        stageData.countID = pageData.setting.countID;
        manager.init();
        watchlist.init();

        //渲染页面和管理页面, 包含了初始化页面滚动
        render.renderPage();
        history.initStatus();

    }
};

module.exports = core;
