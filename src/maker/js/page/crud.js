'use strict';
import _            from 'lodash';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';

var core = {
    //得到当前显示页面内容，保存到数组,
    //增加空白分页
    addPage() {

        pageData.list.push({
            elements: [],
            style:{
                'background-image': 'none',
                'background-color': 'rgba(0,0,0,0)',
                'background-size': 'auto 100%'
            }
        });

        stageData.index = pageData.list.length - 1;

    },

    copyPage() {

        // clone the current page data
        // plus the global countID on the id of each element
        let copy = _.cloneDeep(pageData.list[stageData.index]);
        _.forEach(copy.elements, function(value, key){
            stageData.countID ++;
            value.id = 'm_' + stageData.countID;
        });

        pageData.list.push(copy);

        stageData.index = pageData.list.length - 1;
    },

    //删除当前分页
    removePage() {
        pageData.list.splice(stageData.index, 1);
        //note: pageData.length has minused one
        let length = pageData.list.length;
        stageData.index = stageData.index === length ? length - 1 : stageData.index;
    },

    //交换页面顺序
    swapPage(oldIndex, newIndex) {

        let temp = pageData.list[oldIndex];

        pageData.list.splice(oldIndex, 1);
        pageData.list.splice(newIndex, 0, temp);

        stageData.index = newIndex;
    },

    getCurPage(){
        return pageData.list[stageData.index];
    },

};

module.exports = core;
