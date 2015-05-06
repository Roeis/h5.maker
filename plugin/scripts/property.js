/**
 * property edit
 * author: roeis
 */

(function(global) {
    'use strict';

    var core = {
        /**
         * $obj.each 取属性。
         */
        reformStyle: function(styles) {
            var styleObject = {};

            styles = styles.split(';');
            styles.pop();
            // set a style object to save exist css
            for (var i = 0; i < styles.length; i++) {
                var spliter = styles[i].indexOf('url') > -1 ? ': ' : ':',
                    style = styles[i].split(spliter);

                styleObject[$.trim(style[0])] = $.trim(style[1]);
            }

            return styleObject;
        },

        /*
            父节点，子节点
            
         */
        getCss: function($obj, property) {
            console.log('get CSS');
            //test
        },

        setCss: function($obj, property) {

        },

    };

    global.core = core;

})(this);