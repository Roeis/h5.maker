'use strict';
import util         from '../biz/util.js';
import stageData    from '../data/stageData.js';
import pageData     from '../data/pageData.js';
import history      from '../stage/history.js';

import render       from './render.js';
import elemlist     from './elemlist.js';
import pagelist     from './pagelist.js';

window.render = render;
var isSaving = false;
var core = {

    // 更新数据
    updatePage(){
        let self = this;
        if(isSaving){
            mu.util.alert('还在保存中...');
            return;
        }
        // generate output html
        render.renderRelease();
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

    addTemplate(postData){
        console.log(postData);
        $.ajax({
            url: '/api/template/add',
            type: 'POST',
            data: {
                data: JSON.stringify(postData)
            },
            success: function(data){
                console.log(data);
                mu.util.alert('上传成功');
            },
            complete: function(err){

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
                    pagelist.init();
                    elemlist.init();

                    //渲染页面和管理页面, 包含了初始化页面滚动
                    render.renderUi();
                    history.initStatus();
                }
            },
            complete: function(){

            }
        });
    },

    init() {
        // 远程
        this.id = mu.util.getQueryString('id');
        if(!this.id) {
            mu.util.alert('please has a query');
            return;
        }

        this.getInitData();

        // 本地
        // stageData.countID = pageData.setting.countID;
        // pagelist.init();
        // elemlist.init();
        //
        // //渲染页面和管理页面, 包含了初始化页面滚动
        // render.renderUi();
        //
        // history.initStatus();

        this._bind();
    },

    _bind() {
        util.$doc.on('click', '.post-save', () => {
            this.updatePage();
        });
        util.$doc.on('click', '.post-add-template', () => {
            let postData = {
                name: 'test',
                pic: 'pic',
                src: JSON.stringify(pageData.list[stageData.index])
            };
            this.addTemplate(postData);
        })
    }
};

module.exports = core;
