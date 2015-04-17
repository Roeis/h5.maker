/**
 * 页面管理
 */

(function(global, undefined) {
    'use strict';

    //
    //全局元素序列
    // page = {
    //          html : '',  //静态HTML
    //          curdata : {
    //              "elem_1": {
    //                     id: 1,
    //                     html: ''
    //                  }
    //          }
    //      }
    //

    var core = {

        /**
         * 增加分页
         * @param {object} curData  当前页面dataObj
         * @param {object} pageData 页面总data
         * @param {function} invoke   
         */
        _addPage: function(curData, pageData, invoke) {
            pageData.push(curData);
            invoke && invoke(pageData);
        },

        /**
         * 删除当前分页
         * @param  {number} index    当前页序
         * @param  {object} pageData 页面总data
         * @param  {function} invoke   
         */
        _removePage: function(index, pageData, invoke) {
            pageData.splice(index, 1);
            //note: pageData.length has minused one
            invoke && invoke(pageData);
        },

        /**
         * 插页面顺序
         * @param  {number} oldIdx   原页序
         * @param  {number} newIdx   新页序
         * @param  {object} pageData 页面总data
         * @param  {function} invoke   
         */
        _insertPage: function(oldIdx, newIdx, pageData, invoke) {

            var temp = pageData[oldIdx];

            //pop current index data, length minus one
            pageData.splice(oldIdx, 1);
            //push temp to newIdx just we need
            pageData.splice(newIdx, 0, temp);

            invoke && invoke(pageData, newIdx);
        },

        /**
         * 更新所有页面数据
         * @param  {[type]} $page    [description]
         * @param  {object} pageData [description]
         * @param  {function} invoke   [description]
         */
        _updatePage: function($target, index, pageData, invoke) {
            var html = core.getOriginHtml($target);

            // pageData[index].html = html;
            
        },

        //保存页面数据
        _savePage: function() {
            core._updatePage();

            core._renderPage();
        },

    };

    global.zpage = {

    };
})(this);