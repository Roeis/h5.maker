/**
 * Copyright (c) 2015 All rights reserved
 * author: roeis
 * description:
 */
(function(){
    'use strict';

    var core = {
        init: function(){
            this.getPage();

        },
        getPage:function(){
            var id = mu.util.getQueryString('id');
            if(!id) return;

            mu.request.get({
                url: '/api/get',
                data: {
                    id: id,
                },
                dataType: 'json',
                success: function(data){
                    if(data.Code === 0){
                        var pageData = JSON.parse(data.data);
                        console.log(pageData);
                    }
                },
                error: function(err){

                }
            });
        },
    };

    core.init();

    window.editor = core;
})();
