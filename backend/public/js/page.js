/**
 * Copyright (c) 2015 All rights reserved
 * author: roeis
 * description: 
 */
(function(){
    'use strict';

    var core = {
        init: function(){
            this.bind();
        },

        commonGet: function(url, type, data, callback, errCallback){
            $.ajax({
                url: url,
                type: type,
                data: {
                    data: JSON.stringify(data)
                },
                success: function(data){
                    callback && callback(data);
                },
                error: function(err){
                    errCallback && errCallback(err);
                }
            })
        },
        
        addPage: function(){
            this.requestPage(pageData);
        },
        updatePage: function(){
            this.commonGet('/page/update', 'POST', pageData, function(data){
                console.log(data);
            });
        },

        requestPage: function(data){
            this.commonGet('/page', 'POST', data, function(data){
                console.log(data);
            });
        }
    }
    window.core = core;
})();