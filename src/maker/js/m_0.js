
(function(global) {
    'use strict';

    var standardRatio = 540 / 360;
    var audio = new Audio();
    var core = {

        init: function() {
            console.log('h5 maker go');
            this.setSize();
            this._bind();

            this.initPage();
            this.bindPage();
        },

        getPageStart: function(){
            var idx = 0,
                length = $('.page').length;
            if (location.hash) {
                idx = parseInt(location.hash.replace('#', ''));
            }
            if (isNaN(idx) || idx >= length) {
                idx = 0;
            }
            return idx;
        },

        initPage: function() {
            var pageStart = this.getPageStart();
            this.slider = new MuPage('.page', {
                isLoop: true,
                pageStart: pageStart,
                mode: 'vertical',
                beforeSlide: function($inpage, $oupage){
                    $inpage.find('.cont').show();
                },
                afterSlide: function($inpage, $oupage, index){
                    console.log($inpage, $oupage, index);
                    location.hash = '#' + index;
                    $oupage.find('.cont').hide();
                }
            });
            this.slider.$el.eq(pageStart).find('.cont').show();
            // 初始化页面展示
        },

        bindPage: function(){
            var self = this;
            mu.util.preventScroll();
            $('.wrapper')
                .on('swipeUp', function(){
                    if(!self.slider.isAnimating){
                        self.slider.next();
                    }
                })
                .on('swipeDown', function(){
                    if(!self.slider.isAnimating){
                        self.slider.prev();
                    }
                });
        },

        setSize: function() {
            var size = this.getSize();


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
            var winHeight = document.documentElement.clientHeight || window.innerHeight,
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

            $('div').on('touchstart', function() {});

            $('[data-role]').on('click', function() {
                var $this = $(this),
                    role = $this.attr('data-role'),
                    value = $this.attr('data-value'),
                    analyze = $this.attr('data-analyze');

                console.log($this, role, value);
                if(value){
                    self.reduce($this, role, value);
                }
                self.sendBi(analyze);
            });

            $('[data-role="video"]').each(function(){
                var $this = $(this),
                    value = $this.attr('data-value');
                self.initVideo($this, value);
            });
        },

        initShare: function(){

        },

        sendBi: function(value){
            console.log(value);
            if(window.ht){
                window.ht.sendCustomEvent(value);
            }
        },

        reduce: function($obj, role, value){
            switch(role){
                case 'audio':
                    this.playAudio($obj, value);
                    break;
                case 'link':
                    location.href = value;
                    break;
                case 'jump':
                    // 处理非法溢出值
                    var max = this.slider.max;
                    value = value <= 0 ? 0 : value > max ? max - 1 : value - 1;
                    this.slider.jump(value);
                    break;
                default: 
                    break;

            }
        },

        initVideo: function($obj, value){
            console.log($obj, value);
        },

        playAudio: function($obj, value){
            // 音乐停止或没有播放
            if (audio.paused || !$obj.hasClass('playing')) {
                audio.src = value;
                audio.play();
                $('[data-role="audio"]').removeClass('playing');
                $obj.addClass('playing');
            } else {
                audio.pause();
                $obj.removeClass('playing');
            }

            audio.addEventListener('ended', function() {
                $obj.removeClass('playing');
            }, false);
        },

    };
    global.h5 = core;
    core.init();
})(this);
