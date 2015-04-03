(function(global, $, undefined) {
    'use strict';


    var mu = global.mu,
        util = mu.util,
        page = mu.widget.pagetrans,
        dialog = mu.widget.dialog,
        swipeEvent = [
            {
                prev: 'swipeUp',
                next: 'swipeDown'
            },
            {
                prev: 'swipeLeft',
                next: 'swipeRight'
            },
        ],
        swipeOption = [
            {
                'inclass': {
                    1: 'pt-moveFromBottom',
                    2: 'pt-moveFromTop'
                },
                'ouclass': {
                    1: 'pt-moveToTop',
                    2: 'pt-moveToBottom'
                }
            }, {
                'inclass': {
                    1: 'pt-moveFromRightFade',
                    2: 'pt-moveFromLeftFade'
                },
                'ouclass': {
                    1: 'pt-moveToLeftFade',
                    2: 'pt-moveToRightFade'
                }
            }
        ],
        page_option = {
            beforePageTrans: function($oupage, $inpage) {
                $inpage.find('.m_cont').show();
            },
            afterPageTrans: function($oupage, $inpage, current) {
                $oupage.find('.m_cont').hide();
            },
            /** 转场class对象 */
            cls: swipeOption[0],
            /** 是否循环 */
            loop: true,
            /** 指定开始页面 */
            pageStart: 0
        },
        _audio = new Audio();

    util.preventScroll();

    var core = {
        init: function(){
            core._domReady();
            core._bindEvent();
        },
        _domReady: function(){

            $('.share_weibo').attr('href', window.url1);
            $('.share_qq').attr('href', window.url2);

            if (mu.isWeixin) {
                $('.share_wx').show();
                
            } else {
                $('.share_nwx').show();
            }

            page.init(page_option);

            $('#page' + page_option.pageStart).find('.m_cont').show();
        },
        _bindEvent: function(){
            $('.wrapper')
                .on(swipeEvent[0]['prev'], function() {
                    page.next();
                }).on(swipeEvent[0]['next'], function() {
                    page.prev();
                });

            $('.item_btn').on('click', function(){
                var $this = $(this),
                    url = $this.attr('data-src');

                location.href = url;
            });

            $('.share_wx').on('click', function(){
                dialog.pop('<div class="tip_weixin"></div>',{isMiddle: false});
            });

            //fix iOS active bug
            $('div').on('touchstart', function(){});

            $('.item_audio').on('click', function(){

                var $this = $(this),
                    _src = $this.attr('data-src');
                if (_audio.paused || !$this.hasClass('pause')) {
                    _audio.src = _src;
                    _audio.play();
                    $('.item_audio').removeClass('pause');
                    $this.addClass('pause');
                }else{
                    _audio.pause();
                    $this.removeClass('pause');
                }
                _audio.addEventListener('ended', function () {
                    $this.removeClass('pause');
                }, false);
            });
        }
    };

    core.init();

})(this, window.Zepto);