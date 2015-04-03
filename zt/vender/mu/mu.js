
(function(global) {
    'use strict';
    /**
     * Copyright (c) 2014 All rights reserved.
     * @version 1.0.0
     * @author roeis
     * @description 网站组mobile solution
     * @namespace
     * @global
     */
    var h = global.mu = global.mu || {};

    (function($) {
        if (!$) return;
        /** 
         * 当前版本号
         * @memberof mu
         */
        h.version = '0.10';
        h.$doc = $(document);
        h.$win = $(window);
        h.hasTouch = 'ontouchstart' in window;
        /**
         * 当前navigator.userAgent
         * @memberof mu
         * @return {Boolean}
         */
        h.UA = window.navigator.userAgent.toLowerCase();
        /**
         * isWeixin 返回当前是否在微信中打开
         * @memberof mu
         * @return {Boolean}
         */
        h.isWeixin = function() {
            return h.UA.indexOf('micromessenger') > -1 ? true : false;
        }();

    })(window.Zepto);
    /**
     * 组件类
     * @memberof mu
     * @namespace
     */
    h.widget = {};

})(this);