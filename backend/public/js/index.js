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
        commonGet: function(url, type, data, callback){
            $.ajax({
                url: url,
                type: type,
                data: data,
                success: function(data){
                    callback && callback(data);
                },
                error: function(err){
                    errCallba
                }
            })
        },
        checkUserData: function(){

        },
        getUserData: function(){
            var data = {
                name: document.getElementById('name').value,
                age: parseInt(document.getElementById('age').value, 10),
                flag: document.getElementById('flag').checked
            };
            return data;
        },
        addUser: function(){
            var data = this.getUserData();
            this.requestUser(data);
        },
        requestUser: function(data){
            this.commonGet('/json', 'POST', data, function(data){
                console.log(data);
            });
        },
        updateUser: function(){
            var data = this.getUserData();
            this.commonGet('/update', 'POST', data, function(data){
                console.log(data);
            });
        },
        getUserList: function(){
            this.commonGet('/json', 'GET', {}, function(data){
                console.log(data);
                var html = '';
                if(data.Code === 0){
                    var it = data.data;
                    for(var i = 0; i < it.length; i++){
                        html += '<p>'+ it[i].name + ': '+ it[i].age +'</p>'
                    }
                    $('#lists').html(html);
                }
            });
        },
        bind: function(){
            var self = this;

            self.getUserList();

            $('.add').on('click', function(){
                self.addUser();
            });
            $('.update').on('click', function(){
                self.updateUser();
            })
        }
    }
    core.init();

})();