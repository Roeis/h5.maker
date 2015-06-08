/**
 * name: 测试
 * author: roeis
 * description: 测试
 */
(function() {
    'use strict';


    var page = mu.widget.pagetrans,
        dialog = mu.widget.dialog,
        option = {

        };
    page.init({

    });

    mu.util.preventScroll();

    $('.wrapper')
    .on('swipeUp', function(){
        page.next();
    }).on('swipeDown', function(){
        page.prev();
    });

    $(function(){
        mu.widget.dialog.tip('1');
    });
    // $('.page').transPage({

    // function con(num){
    //     num++;
    //     console.log(num);
    //     setTimeout(function(){
    //         con(num);
    //     }, 2000);
    // }
    // con(1);
    // });

})();