/**
 * property edit
 * author: roeis
 */
(function(global){
    'use strict';

    $.extend({
        log: function(){
            var now = new Date(),
                args = Array.prototype.slice.apply(arguments),
                h = now.getHours(),
                m = now.getMinutes(),
                s = now.getSeconds(),
                time = h + ':' + m + ':' + s;
            console.log('%cAt ' + time + ' Out:', 'font-weight:bold;color:#2A70CE;', args);
        },

    });

})(this);