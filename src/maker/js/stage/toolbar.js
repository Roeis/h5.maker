'use strict';
import _            from 'lodash';
import util         from '../biz/util.js';
import template     from '../template/data.js';
import render       from '../page/render.js';
import watchlist    from '../page/watchlist.js';
import history      from '../stage/history.js';
import operation    from './operation.js';

var core = {
    $toolBar : $('#toolBar'),

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
        var html = `<div class="tool-bar">
                        <ul>`;
                _.forEach(template, function(value, key){
                    html += `<li data-id="${value.id}">${value.cn}</li>`;
                });

                html += `</ul>
                    </div>`;

        this.$elem = $(html);
        this.$toolBar.append(this.$elem);
    },

    _createTabcont() {
        let html = `<div class="tool-bar-cont">`;
            _.forEach(template, function(value, key){
                html += `<div class="tool-bar-cont-li cf" id="${value.id}"></div>`;
            });
            html += `</div>`;

        this.$tabCont = $(html);
        this.$toolBar.append(this.$tabCont);
    },

    _insertData(){
        let self = this;
        _.forEach(template, function(value, key){
            let id = value.id,
                html = self._getExtraDom(key);
            // 默认循环魔板列表中的数据
            _.forEach(value.list, function(c_value, c_key){
                html += `
                            <div class="tool-elem">
                                <div class="tool-src" data-id="${c_key}" data-category="${key}">
                                    <div class="tool-pic">
                                        <img src="${c_value.pic}">
                                    </div>
                                </div>
                            </div>
                        `;
            });

            self.$tabCont.find('#'+id).append(html);
            // 执行操作不适用循环的那些Tab
            self._bindExtra(value, key);
        });
    },

    _bindExtra(value, key){
        switch(key){
            case 'resource':
                console.log('get ajax request');
                /**
                 * here need a api
                 * 要做一个接口，查找每月或一个query的素材数据
                 * 绑定一个加载更多的事件
                 */
                this.$tabCont.find('#' + value.id).append('get resources from lastest month latest year');
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

        util.$doc.on('click', '.tool-bar li', function(){
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
                isIn = $this.closest('#toolBar').length > 0;
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
        watchlist.render();
        render.renderPage();
        history.pushStep();
    },

    hideTab(){
        this.$tabCont.hide();
        this.$elem.find('li').removeClass('active');
    },

};

module.exports = core;
