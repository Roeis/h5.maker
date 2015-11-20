'use strict';
import _            from 'lodash';
import util         from '../biz/util.js';
import pageData     from '../model/pageData.js';
import stageData    from '../model/stageData.js';
// import ajax from './ajax.js';
import render       from './render.js';

var $page = $('#page'),
    $elemList = $('#elemList');

var core = {

    init: function() {

        this.createManager();
        this.createOperation();
        this.bindPage();
        this.renderElems();
        //渲染页面和管理页面, 包含了初始化页面滚动
    },

    //得到当前显示页面内容，保存到数组, 
    //增加空白分页
    addPage: function() {

        pageData.list.push({
            elements: [],
            style:''
        });

        stageData.index = pageData.list.length - 1;

        core.renderOne();
    },


    //复制当前分页
    copyPage: function() {
        console.log(stageData);
        var copy = _.cloneDeep(pageData.list[stageData.index]);
        _.forEach(copy.elements, function(value, key){
            stageData.countID ++;
            value.id = 'm_' + stageData.countID;
        });

        pageData.list.push(copy);
        stageData.index = pageData.list.length - 1;
        core.renderOne();
    },

    //删除当前分页
    removePage: function() {

        pageData.list.splice(stageData.index, 1);
        //note: pageData.length has minused one
        var length = pageData.list.length;
        stageData.index = stageData.index === length ? length - 1 : stageData.index;

        core.renderOne();
    },

    //交换页面顺序
    swapPage: function(oldIndex, newIndex) {

        var temp = pageData.list[oldIndex];

        pageData.list.splice(oldIndex, 1);
        pageData.list.splice(newIndex, 0, temp);

        stageData.index = newIndex;

        core.renderOne();
    },

    //更新所有页面数据
    _update: function() {
        //摧毁pagetrans组件，返回原始DOM
        this.destroy();
    },

    _destroy: function() {

    },

    // 创建页面管理
    createManager: function(){
        $page.append('<div class="page-ul"></div>');

        this.renderManager();

        this.bindManager();

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

    bindManager: function(){
        util.$doc.on('click', '[data-role="copy"]', this.copyPage);
        util.$doc.on('click', '[data-role="remove"]', this.removePage);
        util.$doc.on('click', '[data-role="add"]', this.addPage);
        util.$doc.on('click', '[data-role="template"]', function(){
            console.log('%csync template with cloud', 'color: #f00;');
        });
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

    renderElems: function(){
        var data = pageData.list[stageData.index].elements,
            html = `<div class="elem-list">
                    <div>
                        当前视图
                    </div>`;
        for (var i = 0; i < data.length; i++){
            html += `<div class="elem-li" data-id="${data[i].id}">
                        ${data[i].id}
                    </div>`;
        }
        html += `</div>`;
        $elemList.html(html);
    },

    renderOne: function(){
        this.renderManager();
        this.renderElems();
        render.renderPage();
    },

    bindPage: function(){
        var self = this,
            old_index,
            new_index;

        $page.find('.page-ul').sortable({
            containment: 'parent',
            items: '.page-li',
            placeholder: 'ui-tip',
            start: function(event, ui){
                old_index = $(ui.item).index();
            },
            stop: function(event, ui){
                new_index = $(ui.item).index();

                var alertString = (old_index + 1) + ' 插在' + (old_index > new_index ? new_index : new_index + 1) + ' 后面吗?';

                if(old_index !== new_index){
                    // window.alert(alertString);
                    console.log('swap');
                    self.swapPage(old_index, new_index);
                }
            }
        });

        $page.on('click', '.page-li', function() {
            var index = $(this).index();
            stageData.index = index;
            console.log(pageData);
            $page.find('.page-ul').children().eq(stageData.index).addClass('active').siblings().removeClass('active');

            render.renderPage();
            self.renderElems();
        });

    },
};

module.exports = core;