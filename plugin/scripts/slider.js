
/**
 * $ 插件开发
 */

;(function($, undefined){
    'use strict';


    var _defaults = {
        loop: false,
        interval: 1000,
        afterSlide: function(){},
    };

    var Slider = function(element, options){
        this.$elem = $(element);
        this.options = $.extend({}, _defaults, options);
        this.init();
    };

    Slider.prototype = {
        init: function(){
            var self = this;

            this.count = 0;
            this.isAnimate = false;
            this.timeout = null;
            this.delta = 0;
            self._dom();
            self._event();
            self._loop();
        },
        _dom: function(){
            var el = this.$elem;
            el.wrap('<div class="mslider-container"><div class="mslider_cont"></div></div>');
            this.cont = el.parent();
            this.children = el.children();



        },
        jump: function(type, delta){
            var self = this;
            if(self.isAnimate) {
                console.log('still animating');
                return;
            }else{
                type = type === 'up' ? '': '-';
                self.isAnimate = true;
                self.count += 20;
                console.log('translateY('+ type + delta +'px)');
                self.$elem.css({
                    transform: 'translateY('+ type + delta +'px)'
                });

                var timeout = setTimeout(function(){
                    self.isAnimate = false;
                    // timeout = null;
                }, 400);
            }
        },
        _event: function(){
            console.log(this.children.length);
        },
        _loop: function(){
            var self = this;
            self.timeout = setTimeout(function(){

                self.jump('up', self.delta);
                self.delta += 30;
                // console.log(3);
                self._loop();
            }, self.options.interval);
        },
        stop: function(){
            clearTimeout(this.timeout);
        },
        start: function(){
            this._loop();
        }
    };

    $.fn.mSlider = function(options){

        //extend options;
        // var settings = $.extend({}, _defaults, options),
        //     slider  = {};
        this.each(function(){
            // var $this = $(this);
            var instance = new Slider(this, options);

        });

        return this;
    };

    window.Slider = Slider;

})(jQuery);
