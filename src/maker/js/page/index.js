'use strict';
import _ from 'lodash';
import pageData from '../model';
import Data from '../model/data.js';
import util from '../biz/util.js';
// import ajax from './ajax.js';
import render from './render.js';
var $page = $('#page'),
    $elemList = $('#elemList');
var core = {

    init: function() {
        console.log('page module init');
        this.createPage();

        this.listElems();
        //渲染页面和管理页面, 包含了初始化页面滚动
    },

    //得到当前显示页面内容，保存到数组, 
    //增加空白分页
    addPage: function() {

        pageData.list.push({
            elements: [],
            style:''
        });

        Data.index ++;
    },

    //复制当前分页
    copyPage: function() {
        console.log(Data);
        var copy = _.cloneDeep(pageData.list[Data.index]);
        _.forEach(copy.elements, function(value, key){
            Data.countID ++;
            value.id = 'm_' + Data.countID;
        });

        pageData.list.push(copy);
        Data.index ++;
    },

    //删除当前分页
    removePage: function() {

        pageData.list.splice(Data.index, 1);
        //note: pageData.length has minused one
        var length = pageData.list.length;
        Data.index = Data.index === length ? length - 1 : Data.index;

    },

    //交换页面顺序
    swapPage: function(oldIndex, newIndex) {

        var temp = pageData.list[oldIndex];

        pageData.list.splice(oldIndex, 1);
        pageData.list.splice(newIndex, 0, temp);

        Data.index = newIndex;
    },

    //更新所有页面数据
    update: function() {

        //摧毁pagetrans组件，返回原始DOM
        this.destroy();
    },

    destroy: function() {

    },

    // 创建
    createPage: function(){
        $page.append('<div class="page-ul"></div>');
        this.listPage();
        this.bindPage();
    },

    listPage: function(){
        var html = ``;
        for(var i = 0; i < pageData.list.length; i++){
            html += `<div class="page-li">${i + 1}</div>`;
        }
        html += `</div>`;
        $page.find('.page-ul').html(html);
        $page.find('.page-ul').children().eq(Data.index).addClass('active').siblings().removeClass('active');
    },

    listElems: function(){
        var data = pageData.list[Data.index].elements,
            html = `<div class="elem-list">
                    <div class="">
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
                    window.alert(alertString);
                    console.log('swap');
                    self.swapPage(old_index, new_index);
                }
            }
        });

        $page.on('click', '.page-li', function() {
            var index = $(this).index();
            Data.index = index;
            console.log(pageData);
            $page.find('.page-ul').children().eq(Data.index).addClass('active').siblings().removeClass('active');
            render.renderPage();
        });


    },
};

module.exports = core;