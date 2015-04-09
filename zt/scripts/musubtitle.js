/**
 * muslider
 * text scrolling
 */

(function(global, $, undefined) {
    'use strict';

    // var MuSlider = function(element, options){

    // };

    // $.fn.muSlider = function(options){
    //     return this.each(function(key, value){
    //         var element = $(this);

    //         // Return early if this element already has a plugin instance
    //         if(element.data('muslider')){
    //             return element.data('muslider');
    //         }
    //         // Pass options to plugin constructor
    //         var muslider = new MuSlider(this, options);
    //         // Store plugin object in this element's data
    //         element.data('muslider', muslider);
    //     });
    // };

    // $.fn.muSlider.defaults = {

    // };


    // (function($) {
    //     var privateFunction = function() {
    //         // 执行代码
    //     }

    //     var methods = {
    //         init: function(options) {

    //             // 在每个元素上执行方法
    //             return this.each(function() {
    //                 var $this = $(this);

    //                 // 尝试去获取settings，如果不存在，则返回“undefined”
    //                 var settings = $this.data("pluginName");

    //                 // 如果获取settings失败，则根据options和default创建它
    //                 if (typeof settings === "undefined") {

    //                     var defaults = {
    //                         propertyName: "value",
    //                         onSomeEvent: function() {}
    //                     };

    //                     settings = $.extend({}, defaults, options);

    //                     // 保存我们新创建的settings
    //                     $this.data("pluginName", settings);
    //                 } else {
    //                     / 如果我们获取了settings，则将它和options进行合并（这不是必须的，你可以选择不这样做）
    //                     settings = $.extend({}, settings, options);

    //                     // 如果你想每次都保存options，可以添加下面代码：
    //                     // $this.data("pluginName", settings);
    //                 }

    //                 // 执行代码

    //             });
    //         },
    //         destroy: function(options) {
    //             // 在每个元素中执行代码
    //             return $(this).each(function() {
    //                 var $this = $(this);

    //                 // 执行代码

    //                 // 删除元素对应的数据
    //                 $this.removeData("pluginName");
    //             });
    //         },
    //         val: function(options) {
    //             // 这里的代码通过.eq(0)来获取选择器中的第一个元素的，我们或获取它的HTML内容作为我们的返回值
    //             var someValue = this.eq(0).html();

    //             // 返回值
    //             return someValue;
    //         }
    //     };

    //     $.fn.pluginName = function() {
    //         var method = arguments[0];

    //         if (methods[method]) {
    //             method = methods[method];
    //             arguments = Array.prototype.slice.call(arguments, 1);
    //         } else if (typeof method === "object" || !method ) {
    //             method = methods.init;
    //         } else {
    //             $.error("Method" + method + "does not exist on jQuery.pluginName");
    //             return this;
    //         }

    //         return method.apply(this, arguments);

    //     }

    // })(jQuery);



    var setting = {
        height: 400,
        pause: 4000,
        reverse: false
    };

    var transArr = [],
        count = 0,
        timeout = null,
        $elem = null;

    var core = {
        init: function(elem, options){
            var $this = $(elem),
                $parent,
                $children = $this.children(),
                childHeight = $this.height(),
                offset, offsetParent, initialOffset;
            $elem = $this;
            setting = $.extend(setting, options);

            // get current object
            $this.wrap('<div class="musubtitle_cont"></div>');

            $parent = $this.parent();
            offsetParent = $parent.offset().top;
            offset = offsetParent + setting.height;

            $parent.css({
                height: setting.height +'px',
                overflow: 'hidden'
            });

            var html_control = '<div class="control"><div class="musub_start">start</div><div class="musub_stop">stop</div></div>';
            $(html_control).insertAfter($parent);

            core._getTransArr($children, offsetParent, childHeight - offset);
            initialOffset = '-'+ transArr[transArr.length - 1] +'px';
            $this.css('transform', 'translateY('+ initialOffset +')');
            transArr.reverse();

            console.log(transArr);

            core._bindEvent();
            $this.css('transition', 'transform .5s');
            core.start();
        },

        _bindEvent: function(){
            $elem
                .find('.musub_stop').on('click', function(){
                    core.stop();
                })
                .find('.musub_start').on('click', function(){
                    core.start();
                });
        },

        _getTransArr: function(children, offsetParent, offset ){
            for(var i = 0, l = children.length; i < l; i++){
                var $child = $(children[i]),
                    step = $child.offset().top + $child.height() - offsetParent;
                if(step >= offset){
                    step = offset + offsetParent;
                    transArr.push(step);
                    break;
                }
                transArr.push(step);
            }
        },

        loop: function(){
            timeout = setTimeout(function(){
                if(count >= transArr.length) {
                    // $elem.css({
                    //     transform: 'translateY(0)'
                    // });
                    // count = 0;
                    return;
                }
                $elem.css({
                    transform: 'translateY(-'+ transArr[count] +'px)'
                });
                count++;
                core.loop();
            }, setting.pause);
        },

        start: function(){
            core.loop();
        },

        stop: function(){
            clearTimeout(timeout);
        },

        jump: function(){

        }

    };

    window.muSub = core;

})(this, window.Zepto);