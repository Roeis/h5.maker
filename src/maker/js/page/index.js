'use strict';
import stageData    from '../data/stageData.js';
import pageData     from '../data/pageData.js';
import history      from '../stage/history.js';

import render       from './render.js';
import watchlist    from './watchlist.js';
import manager      from './manager.js';

var isSaving = false;
var core = {

    // 更新数据
    updateData(){

        if(isSaving){
            mu.util.alert('还在保存中...');
            return;
        }
        isSaving = true;
        $.ajax({
            url: '/api/update/',
            type: 'POST',
            data: {
                data: JSON.stringify(pageData)
            },
            dataType: 'json',
            success: function(data){
                console.log(data);
                mu.util.alert('保存成功');
                isSaving = false;
            },
            error: function(err){
                isSaving = false;
            }
        });
    },

    // 获取数据
    getInitData(callback){
        let id = mu.util.getQueryString('id');
        if(!id) return;
        mu.request.get({
            url: '/api/get',
            data: {
                id: id,
            },
            dataType: 'json',
            success: function(data){
                if(data.Code === 0){
                    let pageData = JSON.parse(data.data);
                    console.log(pageData);
                    // get Data

                    callback && callback(pageData);
                }
            },
            error: function(err){

            }
        });
    },

    init() {


        this.getInitData();

        stageData.countID = pageData.setting.countID;
        manager.init();
        watchlist.init();

        //渲染页面和管理页面, 包含了初始化页面滚动
        render.renderPage();
        history.initStatus();

    }
};

module.exports = core;
