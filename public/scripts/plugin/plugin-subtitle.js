/**
 * muslider
 * text scrolling
 */

(function(global, $, undefined) {
    'use strict';

    var setting = {
        height: 400,
        pause: 4000,
        reverse: true,
        step: 200,
        afterEdge: null
    };

    var count = 0,
        delta = setting.step,
        timeout = null,
        $elem = null,
        $parent = null,
        maxHeight,
        html_control = '<div class="subcontrol cf"><div class="sub_up"><i></i></div><div class="sub_down"><i></i></div></div>';

    var core = {
        init: function(elem, options){
            var $this = $(elem),
                $children = $this.children(),
                wrapHeight, elemHeight, offsetParent,
                initialOffset;
            $elem = $this;
            setting = $.extend(setting, options);

            // get current object
            $this.wrap('<div class="subtitle_wrap"><div class="subtitle_cont"></div></div>');

            $parent = $this.parent();

            $(html_control).insertAfter($parent);
            setting.height -= 40;

            offsetParent = $parent.offset().top;
            wrapHeight = offsetParent + setting.height;
            elemHeight = $this.height();

            maxHeight = elemHeight - setting.height;

            $parent.css({
                height: setting.height + 'px',
                overflow: 'hidden'
            });

            // var arr = core._getTransArr($children, offsetParent, maxHeight);
            // console.log(arr);
            // console.log(offsetParent, 'child',elemHeight, 'total', wrapHeight, 'offset',elemHeight - wrapHeight);
            if(setting.reverse){
                // initialOffset = '-'+ arr[arr.length - 1] +'px';
                // arr.reverse();
                // arr.shift();
                // arr.push(0);
                // initialOffset = '0px';
            }else{
                initialOffset = '0px';
            }

            $this.css({
                '-webkit-transform': 'translateY('+ initialOffset +')',
                'transform': 'translateY('+ initialOffset +')',
                '-webkit-transition': '-webkit-transform 1s',
                'transition': 'transform 1s'
            });

            core._bindEvent();
            core.start();
        },

        _bindEvent: function(){
            $('.sub_down').on('click', function(){
                core.stop();
                core.scrollOnce('down');
            });
            $('.sub_up').on('click', function(){
                // core.start();
                core.stop();
                core.scrollOnce('up');
            });
        },

        _getTransArr: function(children, offsetParent, offset ){
            var arr = [];
            for(var i = 0, l = children.length; i < l; i++){
                var $child = $(children[i]),
                    step = $child.offset().top + $child.height() - offsetParent;
                if(step >= offset + offsetParent){
                    step = offset + offsetParent;
                    arr.push(step);
                    break;
                }
                arr.push(step);
            }

            return arr;
        },

        loop: function(){
            console.log(delta, maxHeight);
            timeout = setTimeout(function(){

                // delta = delta >= maxHeight ? maxHeight : delta;

                // core._move(delta);
                core.scrollOnce('down');

                if(delta >= maxHeight) {
                    // $elem.css({
                    //     transform: 'translateY(0)'
                    // });
                    // count = 0;
                    setting.afterEdge.call(this, count);
                    return;
                }

                // delta += setting.step;

                core.loop();

            }, setting.pause);
        },

        _move: function(delta){
            $elem.css({
                '-webkit-transform': 'translateY(-'+ delta +'px)',
                'transform': 'translateY(-'+ delta +'px)'
            });

        },

        scrollOnce: function(type){
            // clearTimeout(timeout);
            if(type === 'up'){
                delta -= setting.step;
                delta = delta < 0 ? 0: delta;
            }else{
                delta += setting.step;
                delta = delta > maxHeight ? maxHeight : delta;
            }
            // console.log(delta);
            core._move(delta);
        },

        destory: function(){
            // $elem.unwrap().unwrap();
        },

        start: function(){
            $parent.data('status','play');
            core.loop();
        },

        stop: function(){
            $parent.data('status','pause');
            clearTimeout(timeout);
        }

    };

    window.scrollSubtitle = core;

})(this, window.Zepto || window.jQuery);