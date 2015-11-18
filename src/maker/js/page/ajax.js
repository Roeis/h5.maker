'use strict';

import pageData from '../model';

var URL = '';
var pageId = window.CUR_DATA.pageId;
var isSaving = false;
var core = {

    // 更新数据
    updateData: function(){
        var data = {
            data: JSON.stringify(pageData)
        };
        if(isSaving){
            console.log('still saving');
            return;
        }
        isSaving = true;
        $.ajax({
            url: URL,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(data){
                isSaving = false;
            },
            error: function(err){
                isSaving = false;
            }
        });
    },
    // 获取数据
    getInitData: function(){
        $.ajax({
            url: URL,
            type: 'GET',
            data: {
                id: pageId
            },
            dataType: 'json',
            success: function(data){

            },
            error: function(err){

            }
        });
    }
};

module.exports = core;