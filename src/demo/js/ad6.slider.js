/**
 * Copyright (c) 2015 All rights reserved
 * author: roeis
 * description: 
 */
(function($){
    'use strict';
    
    var Slider = function(el, opts){
        this.$el = $(el);
        this.opts = opts;

        this.init();
    };

    var defaults = {
        startIndex: 0,
        duration: 1000,
        Mode: 'fade',   // reduce horizontal
        interval: 5000,
        afteSlide: function(index, $elem){
            console.log(index, $elem);
        }
    };

    Slider.prototype = {
        init: function(){
            this.opts = $.extend({}, defaults, this.opts);
            this._create();
            this._createPagi();
            this._initStyle();
            this._play();
            this._bind();
        },
        _create: function(){
            this.$children = this.$el.children();
            this.max = this.$children.length - 1;
            this.index = 0;
            this.animating = false;
            this.timer = null;
        },
        _initStyle: function(){
            var height = this.$children.height();
            this.$el.addClass('adbi-6').css({
                'height': height,
            });
            console.log(height);
            this.$children.eq(this.opts.startIndex).siblings().hide();
        },
        next: function(){
            this.index ++;
            if(this.index > this.max){
                this.index = 0;
            }
            this._transform();
        },
        prev: function(){
            this.index --;
            if(this.index < 0){
                this.index = this.max;
            }
            this._transform();
        },
        jump: function(index){
            this.index = index;
            this._transform();
        },
        _transform: function(){
            var self = this;
            if(self.animating) return;
            self.animating = true;
            self.$pagination.children().eq(self.index).addClass('active')
                .siblings().removeClass('active');
            self.$children
                .eq(self.index).fadeIn(self.opts.duration, function(){
                    self.animating = false;
                    self.opts.afteSlide.call(self, self.index, $(this));
                }).siblings().fadeOut(self.opts.duration);
        },
        _createPagi: function(){
            var html = '<div class="adbi-pager">';
            for(var i = 0; i <= this.max; i++){
                html += '<div class="adbi-pager-item">'+
                            '<a href="javascript:;" data-index="'+ i +'" class="adv-pager-link">'+ i +'</a>'+
                        '</div>';
            }
            this.$pagination = $(html);
            this.$pagination.insertAfter(this.$el);
            this.$pagination.children().eq(this.opts.startIndex).addClass('active');
        },

        _bind: function(){
            var self = this;
            this.$el.parent().on({
                'mouseenter': function() {
                    self._stop();
                },
                'mouseleave': function() {
                    var timer = setTimeout(function(){
                        self._play();
                    }, 2000);
                }
            });
            this.$pagination.on('mouseenter', '.adbi-pager-item', function(){
                var index = $(this).index();
                self.jump(index);
                console.log(index);
            });
        },

        _play: function(){
            var self = this;

            this._stop();
            self.timer = setInterval(function() {
                self.next();
            }, self.opts.interval);
        },

        _stop: function(){
            clearInterval(this.timer);
            this.timer = null;
        },

    };


    var slider = new Slider('#slider', {

    });

})(window.jQuery);