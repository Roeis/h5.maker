/**
 * Copyright (c) 2015 All rights reserved
 * author: roeis
 * description:
 */
(function(){
    'use strict';

    var core = {
        _commonGet: function(url, type, data, callback, errCallback){
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

        addPage: function(data){
            this._commonGet('/api/add', 'POST', data, function(data){
                console.log(data);
            });
        },
        updatePage: function(data){
            this._commonGet('/api/update', 'POST', data, function(data){
                console.log(data);
            });
        },
        getPage: function(id){
            this._commonGet('/api/'+id, 'GET', {}, function(data){
                console.log(data);
            });
        },
        addTemplate: function(data){

            this._commonGet('/api/template/add', 'POST', {
                data: JSON.stringify(data)
            }, function(data){
                console.log(data);
            });
        },

    }
    window.core = core;
})();
