
/**
 * $ 插件开发
 */

;(function($, undefined){
    'use strict';

    // undefined 最为真实的, 没有传进来的
    $.extend({
        sayHello: function(name){
            console.log('Hello,'+(name ? name: 'dude') + '!');
        },
        log: function(){
            var now = new Date(),
                args = Array.prototype.slice.apply(arguments),
                h = now.getHours(),
                m = now.getMinutes(),
                s = now.getSeconds(),
                time = h + ':' + m + ':' + s;
            console.log('%cAt ' + time + ' Out:', 'font-weight:bold;color:#2A70CE;', args);
        }

    });
    var arr = [12,12,32];
    var obj = {test: 12132, test2: arr};
    $.log(obj, arr, 234234, '234234');


    $.fn.pluginName = function(options){
        var defaults = {
            color: '#F50',
            size: '16px'
        };
        $.log(defaults);
        var settings = $.extend({},defaults, options);
        // console.log(settings);
        // 这里的this 指的是用jquery选中的元素，
        // eg: $('a'), this 就是 $('a') 一个jquery对象
        $.log(this);
        return this.each(function(idx, elem){
            var $this = $(this),
                title = $this.attr('title');
            $this.append(':'+title);
            $this.css({
                color: settings.color
            })
        });
    };

    // 另一种写法
    // $.extend($.fn, {
    //     pluginName: function(){
    //         this.css('color', 'yellow');
    //     }
    // });
    
    var defaults = {
        'color': 'red',
        'fontSize': '12px'
    };
    var Beautifier = function(ele, opts){
        this.$element = ele;
        this.options = $.extend({}, defaults, opts);
    };

    Beautifier.prototype = {
        beautify: function(){
            var that = this;
            return this.$element.each(function(){
                var $this = $(this);
                $this.css({
                    'color': that.options.color,
                    'font-size': that.options.fontSize
                });
            });
        }
    };

    $.fn.beautify = function(options){
        var instance = new Beautifier(this, options);

        return instance.beautify();
    };

    // window.Beautifier = Beautifier;

})(jQuery);
