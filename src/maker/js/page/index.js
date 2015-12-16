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
        
        this._create();
        this._bind();
    },

    _create(){
        var html = `<div class="dg-dialog dg-upload-template">
                        <div class="dg-title">
                            新增模板
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                模板名称
                            </div>
                            <div class="col-md-8">
                                <input class="form-control" type="text" id="template-name">
                            </div>
                        </div>
                        <div class="row">
                            <a href="javascript:;" class="btn btn-success btn-upload-template">上传</a>
                        <div>
                    </div>`;
        util.$body.append(html);
        this.updateTemplate = new MuDialog('.dg-upload-template', {
            opacity: 0.4
        });
        let templateName = document.getElementById('template-name');
        this.updateTemplate.$el.find('.btn-upload-template').on('click', () => {
            if(!templateName.value){
                alert('please enter a name');
                return;
            }
            let postData = {
                name: templateName,
                pic: 'http://i2.w.hjfile.cn/news/201503/201503264503973418.jpg',
                src: JSON.stringify(pageData.list[stageData.index])
            };
            this.addTemplate(postData);
            this.updateTemplate.close();
        });
    },

    _bind() {
        util.$doc.on('click', '.post-save', () => {
            this.updatePage();
        });
        util.$doc.on('click', '.post-add-template', () => {
            this.updateTemplate.open();
        });
    }
};

module.exports = core;
