'use strict';
import _            from 'lodash';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';

var core = {
    //得到当前显示页面内容，保存到数组, 
    //增加空白分页
    addPage: function() {

        pageData.list.push({
            elements: [],
            style:''
        });

        stageData.index = pageData.list.length - 1;

    },

    copyPage: function() {

        // clone the current page data
        // plus the global countID on the id of each element
        var copy = _.cloneDeep(pageData.list[stageData.index]);
        _.forEach(copy.elements, function(value, key){
            stageData.countID ++;
            value.id = 'm_' + stageData.countID;
        });

        pageData.list.push(copy);
        stageData.index = pageData.list.length - 1;
    },

    //删除当前分页
    removePage: function() {

        pageData.list.splice(stageData.index, 1);
        //note: pageData.length has minused one
        var length = pageData.list.length;
        stageData.index = stageData.index === length ? length - 1 : stageData.index;
    },

    //交换页面顺序
    swapPage: function(oldIndex, newIndex) {

        var temp = pageData.list[oldIndex];

        pageData.list.splice(oldIndex, 1);
        pageData.list.splice(newIndex, 0, temp);

        stageData.index = newIndex;
    },

};

module.exports = core;