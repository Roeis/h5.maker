'use strict';
import _ from 'lodash';
import data from '../model';
import util from '../biz/util.js';
// import ajax from './ajax.js';

var core = {
    index: 0,

    init: function() {
        console.log('page module init');
        //渲染页面和管理页面, 包含了初始化页面滚动
    },

    //得到当前显示页面内容，保存到数组, 
    //增加空白分页
    addPage: function() {

        data.list.push({
            elements: [],
            style:''
        });

        this.index ++;
    },

    //复制当前分页
    copyPage: function() {

        var copy = _.cloneDeep(data.list[this.index]);
        console.log(copy);
        data.list.push(copy);

        this.index ++;
    },

    //删除当前分页
    removePage: function() {

        data.list.splice(this.index, 1);
        //note: pageData.length has minused one

        core._renderPage();
    },

    //交换页面顺序
    swapPage: function(oldIndex, newIndex) {

        var temp = data.list[oldIndex];

        data.list.splice(oldIndex, 1);
        data.list.splice(newIndex, 0, temp);

    },

    //更新所有页面数据
    update: function() {

        //摧毁pagetrans组件，返回原始DOM
        this.destroy();
    },

    destroy: function() {

    },

    save: function() {
        core.update();
        core.render();
    }

};

module.exports = core;