'use strict';
import _            from 'lodash';
import util         from '../biz/util.js';
import stageData    from '../data/stageData.js';
import template     from '../template/data.js';
import render       from '../page/render.js';
import elemlist     from '../page/elemlist.js';
import history      from '../stage/history.js';
import operation    from './operation.js';

var core = {
    $topbar : $('#topBar'),

    init() {
        this._create();
        this._bind();

        this._createTabcont();
        this._insertData();
    },
    /**
     * 创建右键
     * @return {[type]} [description]
     */
    _create(){
        var html = `<div class="top-bar">
                        <ul>`;
                _.forEach(template, function(value, key){
                    html += `<li data-id="${value.id}">${value.cn}</li>`;
                });

                html += `</ul>
                    </div>`;

        this.$elem = $(html);
        this.$topbar.append(this.$elem);
    },

    _createTabcont() {
        let html = `<div class="top-bar-cont">`;
            _.forEach(template, function(value, key){
                html += `<div class="top-bar-cont-li cf" id="${value.id}"></div>`;
            });
            html += `</div>`;

        this.$tabCont = $(html);
        this.$topbar.append(this.$tabCont);
    },

    _insertData(){
        let self = this;
        _.forEach(template, function(value, key){
            let html = self._getExtraDom(key);
            html += self._insertTemplateHtml(value.list, key);
            self.$tabCont.find('#'+ value.id).append(html);
            // 除了循环，需要额外操作的那些Tab
            self._bindExtra(value, key);
        });
    },

    _insertTemplateHtml(data, key){
        var html = ``;
        // 默认循环魔板列表中的数据
        _.forEach(data, function(c_value, c_key){
            html += `<div class="tool-elem">
                            <div class="tool-src" data-id="${c_key}" data-category="${key}">
                                <div class="tool-pic" title="by ${c_value.author}">
                                    <span>${c_value.name}</span>
                                    <img src="${c_value.pic}">
                                </div>
                            </div>
                        </div>`;
        });
        return html;
    },

    _bindExtra(value, key){
        var self = this;
        console.log(value, key);
        switch(key){
            case 'resource':
                // console.log('get ajax request');
                /**
                 * here need a api
                 * 要做一个接口，查找每月或一个query的素材数据
                 * 绑定一个加载更多的事件
                 */
                this.$tabCont.find('#' + value.id).append('get resources from lastest month latest year');
                break;
            case 'template':
                console.log('get ajax request');
                $.ajax({
                    url: '/api/template/list' + '?v='+Math.random(),
                    type: 'GET',
                    data: {
                        pageIndex: 1,
                        pageSize: 10
                    },
                    success: function(data){
                        if(data.Code === 0){
                            let it = data.data.list,
                                html = ``;
                            for(let i = 0; i < it.length; i++){
                                let tmpl = {};
                                tmpl[it[i].id] = it[i];
                                html += `<div class="tool-elem">
                                                <div class="tool-src" data-id="${it[i].id}" data-category="${key}">
                                                    <div class="tool-pic">
                                                        <span>${it[i].name}</span>
                                                        <img src="${it[i].pic}">
                                                    </div>
                                                </div>
                                            </div>`;
                                _.extend(value.list, tmpl);
                            }
                            self.$tabCont.find('#'+ value.id).append(html);
                            console.log(data);
                        }
                    },
                    complete: function(err){

                    }
                });
                break;
            default:
                break;
        }
    },

    _getExtraDom(key){
        let html = '';
        switch(key){
            case 'resource':
                html += `<div class="row">
                                <div class="col-md-8">
                                    <input type="file" class="form-control">
                                </div>
                                <div class="col-md-4">
                                    <button class="btn btn-default">upload</button>
                                </div>
                            </div>
                            <div class="row" id="fileupload">
                                'here is room for asdf '
                            </div>
                        `;
                break;
            default:
                break;
        }
        return html;
    },

    _bind() {
        var self = this;

        util.$doc.on('click', '.top-bar li', function(){
            let $this = $(this),
                index = $this.index(),
                id = $this.attr('data-id');
            self.$elem.find('li').removeClass('active');
            $this.addClass('active');
            self.$tabCont.children().hide();
            self.$tabCont.show().find('#'+id).show();

            console.log(id, index);
        });

        util.$doc.on('click', function(event){
            let $this = $(event.target),
                isIn = $this.closest('#topBar').length > 0;
            if(!isIn){
                self.hideTab();
            }
        });

        //点击模板列表页面，根据不同种类和ID做操作
        util.$doc.on('click', '.tool-src', function(event){
            let $this = $(this),
                cate = $this.attr('data-category'),
                id = $this.attr('data-id');

            switch(cate){
                case 'element':
                    operation.addElem(cate, id);
                    self._render();
                    break;
                case 'template':
                    // let confirm = window.confirm('确定要覆盖当前页面吗？');
                    // if(confirm){
                    //     operation.replacePage(cate, id);
                    // }
                    mu.util.confirm('确定要覆盖当前页面吗？', function(flag){
                        if(flag){
                            operation.replacePage(cate, id);
                            self._render();
                        }
                    });
                    break;
                case 'resource':
                    break;
                case 'api':
                    break;
                default:
                    break;
            }

            self.hideTab();
        });
    },

    _render(){
        elemlist.render();
        render.renderHtmlPage(stageData.index);
        history.pushStep();
    },

    hideTab(){
        this.$tabCont.hide();
        this.$elem.find('li').removeClass('active');
    },

};

module.exports = core;
