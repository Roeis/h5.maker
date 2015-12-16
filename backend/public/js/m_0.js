(function(global) {
    'use strict';

    var standardRatio = 540 / 360;

    var core = {

        init: function() {
            console.log('h5 maker go');
            this.setSize();
            this._bind();

            this.initPage();
            this.bindPage();
        },

        initPage: function() {
            this.slider = new MuPage('.page', {
                isLoop: true,
                mode: 'vertical',
                beforeSlide: function($inpage, $oupage){
                    $inpage.find('.cont').show();
                },
                afterSlide: function($inpage, $oupage, index){
                    console.log($inpage, $oupage, index);
                    $oupage.find('.cont').hide();
                }
            });
        },

        bindPage: function(){
            var self = this;
            $('.wrapper')
                .on('swipeUp', function(){
                    self.slider.next();
                })
                .on('swipeDown', function(){
                    self.slider.prev();
                });
        },

        setSize: function() {
            let size = this.getSize();


            $('.cont').css({
                width: size.width,
                height: size.height,
                left: size.left,
                top: size.top,
                position: 'absolute'
            });
        },

        getSize: function() {
            // it reread the value when resize or something like that
            let winHeight = document.documentElement.clientHeight || window.innerHeight,
                winWidth = document.documentElement.clientWidth || window.innerWidth,
                ratio = winHeight / winWidth,
                width, height, left, top;

            if (ratio > standardRatio) {
                width = winWidth;
                height = width * standardRatio;
                top = (winHeight - height) / 2;
                left = 0;
            } else {
                height = winHeight;
                width = height / standardRatio;
                left = (winWidth - width) / 2;
                top = 0;
            }

            return {
                width: width,
                height: height,
                top: top,
                left: left
            };
        },

        _bind: function() {
            var self = this;
            $(window).on('resize', function(){
                self.setSize();
            });

        }
    };
    global.h5 = core;
    core.init();
}(this));
