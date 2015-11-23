'use strict';
import _            from 'lodash';
import util         from '../biz/util.js';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import template     from '../template/data.js';
import render       from '../page/render.js';
import watchlist    from '../page/watchlist.js';

var $toolBar = $('#toolBar');

var core = {

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
        $toolBar.append(this.$elem);
    },

    _createTabcont() {
        var html = `<div class="tool-bar-cont">`;
            _.forEach(template, function(value, key){
                html += `<div class="tool-bar-cont-li cf" id="${value.id}"></div>`;
            });
            html += `</div>`;

        this.$tabCont = $(html);
        $toolBar.append(this.$tabCont);
    },

    _insertData(){
        var self = this;
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
        var html = '';
        switch(key){
            case 'resource':
                html += `
                            <div class="row">
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
            var $this = $(this),
                index = $this.index(),
                id = $this.attr('data-id');
            self.$elem.find('li').removeClass('active');
            $this.addClass('active');
            self.$tabCont.children().hide();
            self.$tabCont.show().find('#'+id).show();

            console.log(id, index);
        });

        util.$doc.on('click', function(event){
            var $this = $(event.target),
                isIn = $this.closest('#toolBar').length > 0;
            if(!isIn){
                self.hideTab();
            }
        });

        //点击模板
        util.$doc.on('click', '.tool-src', function(event){
            var $this = $(this),
                cate = $this.attr('data-category'),
                id = $this.attr('data-id');
            console.log(id);
            switch(cate){
                case 'element':
                    self.addElem(cate, id);
                    break;
                case 'template':
                    var confirm = window.confirm('确定要覆盖当前页面吗？');
                    if(confirm){
                        self.replacePage(cate, id);
                    }
                    break;
                case 'resource':
                    break;
                case 'api':
                    break;
                default: 
                    break;
            }
            
            self.hideTab();
            watchlist.render();
            render.renderPage();
            render.pushHistory();
        });
    },

    hideTab(){
        this.$tabCont.hide();
        this.$elem.find('li').removeClass('active');
    },

    // 新增元素，clone then plus id
    addElem(cate, id){
        let elem = _.cloneDeep(template[cate].list[id].src);
        console.log(elem);
        stageData.countID ++;
        elem.id = 'm_' + stageData.countID;
        pageData.list[stageData.index].elements.push(elem);

    },

    // 填充模板页面
    replacePage(cate, id){
        let clone = _.cloneDeep(template[cate].list[id].src);
        console.log(clone);
        // add id for every element in copy
        _.forEach(clone.elements, (value, key) => {
            stageData.countID ++;
            value.id = 'm_' + stageData.countID;
        });

        pageData.list[stageData.index] = clone;
    },

};

module.exports = core;