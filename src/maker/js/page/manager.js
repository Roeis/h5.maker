'use strict';
import util         from '../biz/util.js';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import handle       from './handle.js';
import render       from './render.js';
import watchlist    from './watchlist.js';
import history      from '../stage/history.js';

window.handle = handle;

var core = {
    $page : $('#page'),

    init(){
        this._create();
        this._createBtn();
        this.bindPage();
    },

    // 创建页面管理
    _create(){
        this.$page.append('<div class="page-ul-wrap"><div class="page-ul"></div></div>');

        this._renderList();
        this._bind();

        this.$page.find('.page-ul-wrap').append('');

    },

    _createBtn(){
        let html = `<div class="page-operation">
                        <button class="btn btn-default" data-role="upload" title="同步至云端，由管理员审核">上传魔板</button>
                    </div>`;
        this.$page.append(html);
        let html_control = `<div class="page-control">
                                <a class="btn btn-brand" data-role="add">添加</a>
                                <a class="btn btn-brand" data-role="copy">复制</a>
                                <a class="btn btn-default" data-role="remove">删除</a>
                            </div>`;
        this.$page.find('.page-ul-wrap').append(html_control);
    },

    _bind(){
        util.$doc
            .on('click', '[data-role="add"]', () => {
                handle.addPage();
                history.push();
                this.renderOne();
                history.pushStep();
            })
            .on('click', '[data-role="copy"]', () =>  {
                handle.copyPage();
                history.push();
                this.renderOne();
                history.pushStep();
            })
            .on('click', '[data-role="remove"]', () => {
                if(pageData.list.length === 1){
                    mu.util.alert('已不能再删除');
                    return;
                }
                handle.removePage();
                history.remove();
                this.renderOne();
                history.renderHistory();
            })
            .on('click', '[data-role="upload"]', () => {
                let page = handle.getCurPage();
                console.log(page);
                // post Delate;
                console.log('%csync template with cloud', 'color: #f00;');
            });
    },

    _renderList(){
        let html = ``;
        for(let i = 0; i < pageData.list.length; i++){
            html += `<div class="page-li">${i + 1}</div>`;
        }
        html += `</div>`;
        this.$page.find('.page-ul').html(html);
        this.$page.find('.page-ul').children().eq(stageData.index).addClass('active').siblings().removeClass('active');
    },

    bindPage(){
        let old_index,
            new_index,
            self = this;

        // 页面排序
        self.$page.find('.page-ul').sortable({
            containment: 'parent',
            items: '.page-li',
            placeholder: 'ui-tip',
            start: function(event, ui){
                old_index = $(ui.item).index();
            },
            stop: function(event, ui){
                new_index = $(ui.item).index();

                if(old_index !== new_index){
                    handle.swapPage(old_index, new_index);
                    history.swap(old_index, new_index);
                    self.renderOne();
                }
            }
        });

        // 页面跳转
        self.$page.on('click', '.page-li', function() {
            let index = $(this).index(),
                cache = stageData.caches[index];
            if(index === stageData.index) return;
            stageData.index = index;
            self.$page.find('.page-ul').children().eq(stageData.index).addClass('active')
                .siblings().removeClass('active');

            render.renderPage();

            // push 初始状态
            cache.cursor === -1 ? history.pushStep() : history.renderHistory();
            watchlist.render();
        });

    },

    renderOne(){
        this._renderList();
        watchlist.render();
        render.renderPage();
    }
};

module.exports = core;
