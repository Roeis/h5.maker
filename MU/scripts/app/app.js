/**
 * name:
 * author: roeis
 * description:
 */
(function() {
    'use strict';
    define(['jquery', 'underscore', 'request', 'helper/jquery.helpers', 'helper/mu/mu'],
        function($, _, request) {

            var core = {
                init: function() {
                    console.log('app start');

                    var videoSrc = 'http://v.youku.com/v_show/id_XOTUwMzAzMDEy_ev_5.html?from=y1.3-idx-uhome-1519-20887.205805-205902.8-2';
                    var videoSrc2 = 'http://www.tudou.com/listplay/cJn6UVxpAnQ/4rTvmsg1owo.html';
                    // $.log('dfs');

                    // var ts = core.filter([1, 3, 4], function(num, idx) {
                    //     return num % 2 === 0;
                    // });
                    // console.log(request, mu);
                    core.getData();
                    var need = require;
                    need(['helper/haEvent'], function(){
                        console.log(ht2);
                    });

                    var regYouku = /youku\.com/;

                    if(regYouku.test(videoSrc)){
                        need(['http://player.youku.com/jsapi'], function(){

                            var html = '<div id="youkuplayer" style="width:100%;height:200px"></div>';
                            // console.log(YKU);
                            var player = new YKU.Player('youkuplayer',{
                                styleid: '0',
                                client_id: 'b051e0b225e7051b',
                                vid: 'XOTUwMzAzMDEy'
                            });
                        });
                    }

                    //youku id  /id_[^.]*/, match 

                    // need('Video', function(module){
                    //     console.log(module);
                    // }, function(error){
                    //     console.log(error);
                    // });
                    


                    // console.log(mu.cache);
                    // $(document).delegate('*[class*=_HT]', 'click', core._sendEvent);
                },

                getData: function() {
                    var url = {
                            st: 'http://api2.site.hujiang.com/SheTuan/SheTuan.ashx'
                        },
                        para = {
                            st: {
                                op: 'GetPostListByTopicID',
                                topicid: 163068829881,
                                page: 1,
                                pageSize: 50
                            }
                        };
                    $.log('loadding...');
                    request.ajaxData(url.st, para.st, function(data) {
                        // console.log(data);
                        $.log('loaded', data);
                    }, false);
                }
            };

            return core;

        });
})();