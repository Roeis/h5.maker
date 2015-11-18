'use strict';
import util from '../biz/util.js';

var core = {

    init: function() {
        this._create();
        this._bind();
    },
    /**
     * 创建右键
     * @return {[type]} [description]
     */
    _create: function(){
        var html = `<div class="tool-bar">
                        <ul>
                            <li class="toolbar-elem">元素</li>
                            <li class="toolbar-tmpl">模板</li>
                            <li class="toolbar-logo">logo</li>
                            <li class="toolbar-apis">接口</li>
                            <li class="toolbar-srcs">素材</li>
                        </ul>
                    </div>`;
        this.$elem = $(html);
        $('#toolBar').append(this.$elem);
    },

    _bind: function() {
        // toolbar
        util.$doc.on('click', '.toolbar-elem', function(){
            
            // var elem = _.cloneDeep(elements.defaultElem);
            // elem.id = 'm_' + countID ++;

            // pageData.list[0].elements.push(elem);
            // console.log(pageData);
            // var html = `<div class="elem editable" id="${id}">
            //                 test
            //             </div>`;
            // $('.page').eq(0).append(html);
        });
    },
};

module.exports = core;