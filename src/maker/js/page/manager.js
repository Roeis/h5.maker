'use strict';
import util         from '../biz/util.js';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import handle       from './handle.js';
import render       from './render.js';
import watchlist    from './watchlist.js';

var $page = $('#page');

var core = {
    // 创建页面管理
    createManager: function(){
        $page.append('<div class="page-ul"></div>');

        this.renderManager();

        this.bindManager();

    },

    createOperation: function(){
        var html = `<div class="page-operation">
                        <button class="btn btn-default" data-role="add">新增</button>
                        <button class="btn btn-default" data-role="remove">删除</button>
                        <button class="btn btn-default" data-role="copy">复制</button>
                        <button class="btn btn-default" data-role="template" title="同步至云端，由管理员审核">保存为魔板</button>
                    </div>`;
        $page.append(html);
    },

    bindManager: function(){
        var self = this;
        util.$doc.on('click', '[data-role="copy"]', function() {
            handle.copyPage();
            self.renderOne();
        });
        util.$doc.on('click', '[data-role="remove"]', function(){
            handle.removePage();
            self.renderOne();
        });
        util.$doc.on('click', '[data-role="add"]', function(){
            handle.addPage();
            self.renderOne();
        });
        util.$doc.on('click', '[data-role="template"]', function(){
            console.log('%csync template with cloud', 'color: #f00;');
        });
    },

    renderManager: function(){
        var html = ``;
        for(var i = 0; i < pageData.list.length; i++){
            html += `<div class="page-li">${i + 1}</div>`;
        }
        html += `</div>`;
        $page.find('.page-ul').html(html);
        $page.find('.page-ul').children().eq(stageData.index).addClass('active').siblings().removeClass('active');
    },

    bindPage: function(){
        var old_index,
            new_index,
            self = this;

        // 页面排序
        $page.find('.page-ul').sortable({
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
                    self.renderOne();
                }
            }
        });

        $page.on('click', '.page-li', function() {
            var index = $(this).index();
            stageData.index = index;

            $page.find('.page-ul').children().eq(stageData.index).addClass('active').siblings().removeClass('active');

            render.renderPage();
            watchlist.render();
        });

    },

    renderOne: function(){
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