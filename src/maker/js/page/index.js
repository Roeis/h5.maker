'use strict';
import util         from '../biz/util.js';
import stageData    from '../data/stageData.js';
import pageData     from '../data/pageData.js';
import history      from '../stage/history.js';

import render       from './render.js';
import watchlist    from './watchlist.js';
import manager      from './manager.js';

var isSaving = false;
var core = {

    // 更新数据
    updatePage(){
        let self = this;
        if(isSaving){
            mu.util.alert('还在保存中...');
            return;
        }
        pageData.setting.countID = stageData.countID;
        let postData = {
            id: self.id,
            content: JSON.stringify(pageData)
        };
        isSaving = true;
        $.ajax({
            url: '/api/update/',
            type: 'POST',
            data: {
                data: JSON.stringify(postData)
            },
            success: function(data){
                console.log(data);
                mu.util.alert('保存成功');
            },
            complete: function(err){
                isSaving = false;
            }
        });
    },


    // 获取数据
    getInitData(){
        let self = this;
        mu.request.get({
            url: '/api/get',
            data: {
                id: self.id
            },
            dataType: 'json',
            success: function(data){
                if(data.Code === 0){
                    let cloneData = JSON.parse(data.data);
                    console.log(cloneData);

                    for(let key in cloneData){
                        if(cloneData.hasOwnProperty(key)){
                            pageData[key] = cloneData[key];
                        }
                    }

                    // get Data
                    stageData.countID = pageData.setting.countID;
                    manager.init();
                    watchlist.init();

                    //渲染页面和管理页面, 包含了初始化页面滚动
                    render.renderPage();
                    history.initStatus();
                }
            },
            complete: function(){

            }
        });
    },

    init() {
        // // 远程
        // this.id = mu.util.getQueryString('id');
        // if(!this.id) {
        //     mu.util.alert('please has a query');
        //     return;
        // }
        //
        // this.getInitData();

        // 本地
        stageData.countID = pageData.setting.countID;
        manager.init();
        watchlist.init();

        //渲染页面和管理页面, 包含了初始化页面滚动
        render.renderPage();
        history.initStatus();

        this._bind();
    },

    _bind() {
        util.$doc.on('click', '.post-save', () => {
            this.updatePage();
        });
        util.$doc.on('click', 'post-template', () => {
            
        })
    }
};

module.exports = core;
