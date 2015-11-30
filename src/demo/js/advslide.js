/**
 * Copyright (c) 2015 All rights reserved
 * author: roeis
 * description: 
 */
(function() {
    'use strict';

    var url = 'http://yz.a6.hujiang.com/v2/slide.ashx',
        query = {
            aid: 613
        };

    var core = {
        init: function() {
            var self = this;
            $('[data-aid]').each(function(idx, elem) {
                var $elem = $(elem),
                    aid = $elem.data('aid');
                query.aid = aid;

                self.getData(url, query, function(data) {
                    if (data.Code === 1) {
                        self.getData(data.Data.DisplayHref);
                        self.initUi(data, $elem);
                    }
                });
            });
        },
        initUi: function(data, $elem) {
            // 成功调用 Code: 1
            console.log(data);

            var html = this.createHtml(data.Data),
                id = 'aid_' + query.aid,
                $html = $(html),
                slider = {};

            $html.attr('id', id);
            $elem.append($html);
            slider[id] = $html.find('.adv-slider').bxSlider({
                mode: 'fade', //horizontal, fade
                controls: false,
                onSlideAfter: function($elem, oldIdx, newIdx) {
                    console.log(newIdx);
                }
            });
            slider[id].startAuto();
        },
        createHtml: function(data) {
            var it = data.MediaBuyList,
                html = '';
            html += '<div class="adv-slider-wrap">';
            html += '<ul class="adv-slider">';
            for (var i = 0; i < it.length; i++) {
                html += '<li style="background-color:' + it[i].FillColor + '; background-image:url(' + it[i].ImgPath + '); height:' + it[i].Height + 'px;">' +
                    '<a href="' + it[i].TargetUrl + '" target="_blank" title="' + it[i].Text + '"></a></li>';
            }
            html += '</ul>';
            html += '</div>';
            return html;
        },
        getData: function(url, query, callback) {
            $.ajax({
                url: url,
                data: query,
                type: 'GET',
                dataType: 'jsonp',
                success: function(data) {
                    callback && callback(data);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        },
    };
    core.init();
})();
