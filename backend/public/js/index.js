/**
 * Copyright (c) 2015 All rights reserved
 * author: roeis
 * description:
 */
(function(){
    'use strict';

    var core = {
        init: function(){

            this.getPageList();
            this._bind();
        },
        commonGet: function(url, type, data, callback){
            $.ajax({
                url: url,
                type: type,
                data: data,
                success: function(data){
                    callback && callback(data);
                },
                error: function(err){
                    console.log(err);
                }
            });
        },
        getPageList: function(){
            this.commonGet('/api/list', 'GET', {
                pageIndex: 1,
                pageSize: 10
            }, function(data){
                console.log(data);
                var html = '',
                    html_online = '',
                    link = '';
                if(data.Code === 0){
                    var it = data.data.list;
                    for(var i = 0; i < it.length; i++){
                        html_online = it[i].isPublish ? '<span class="label label-success">online</span>' : '<span class="label label-default">offline</span>';
                        link = '/edit/?id=' + it[i]._id;
                        html += '<tr data-id="'+ it[i]._id +'">'+
                                    '<td>'+ it[i].title +'</td>'+
                                    '<td>'+ it[i].alias +'</td>'+
                                    '<td>'+ it[i].langs +'</td>'+
                                    '<td>'+ it[i].createUser +'</td>'+
                                    '<td>'+ it[i].updateDate +'</td>'+
                                    '<td>'+ html_online +'</td>'+
                                    '<td>'+
                                        '<a href="'+ link +'" target="_blank" type="type" class="btn btn-default">编辑</a>'+
                                        // '<a href="javascript:;" type="type" class="btn btn-default">设置</a>'+
                                        // '<a href="javascript:;" type="type" class="btn btn-default">预览</a>'+
                                    '</td>'+
                                '</tr>';
                    }
                    $('#pageList').html(html);
                }
            });
        },

        _bind: function(){

        },

    };

    core.init();

    window.h5 = core;
})();
