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
    // 创建页面管理
    createManager(){
        this.$page.append('<div class="page-ul"></div>');

        this.renderManager();

        this.bindManager();
    },

    createOperation(){
        let html = `<div class="page-operation">
                        <button class="btn btn-default" data-role="add">新增</button>
                        <button class="btn btn-default" data-role="remove">删除</button>
                        <button class="btn btn-default" data-role="copy">复制</button>
                        <button class="btn btn-default" data-role="template" title="同步至云端，由管理员审核">保存为魔板</button>
                    </div>`;
        this.$page.append(html);
    },

    bindManager(){
        let self = this;
        util.$doc.on('click', '[data-role="copy"]', function() {
            handle.copyPage();
            history.push();
            self.renderOne();
        });
        util.$doc.on('click', '[data-role="remove"]', function(){
            handle.removePage();
            history.remove();
            self.renderOne();
        });
        util.$doc.on('click', '[data-role="add"]', function(){
            handle.addPage();
            history.push();
            self.renderOne();
        });
        util.$doc.on('click', '[data-role="template"]', function(){
            console.log('%csync template with cloud', 'color: #f00;');
        });
    },

    renderManager(){
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
        this.renderManager();
        watchlist.render();
        render.renderPage();
    },

    init(){
        this.createManager();
        this.createOperation();
        this.bindPage();
    }
};

module.exports = core;
