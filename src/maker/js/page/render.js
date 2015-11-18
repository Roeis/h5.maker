'use strict';
import _ from 'lodash';
import pageData from '../model';
import util from '../biz/util.js';

var core = {
    // 渲染正式DOM结构，区别于操作DOM
    render: function() {
        let html = '',
            template = '<div class="elem" id="<%= id %>"><%= value %></div>',
            curData = pageData.list[this.index];
        for(let i = 0; i < curData.elements.length; i++){
            let it = curData.elements[i];
            html += _.template(template)(it);
        }
        console.log(html);
    },

    // 样式字符串化，id, style, 生成后添加到head
    stringifyStyle: function(obj) {
        // 过滤样式规则， 以及补全
        let styleObj = obj.style;
        if(styleObj.animation){
            styleObj['-webkit-animation'] = styleObj.animation;
        }
        let style = JSON.stringify(styleObj);
        style = '#' + obj.id + style;
        // transform \" -> none, " -> none, , -> ;
        style = style.replace(/\\\"/g, '').replace(/\"/g, '').replace(/\,/g, ';');
        return style;
    },

    // 渲染正式CSS结构，从DOM中分离到head中style标签
    renderStyle: function() {
        let stylesheet = '';
        for(let i = 0; i < pageData.list.length; i++){
            for(let j = 0; j < pageData.list[i].elements.length; j++){
                let it = pageData.list[i].elements[j];
                let style = this.stringifyStyle(it);
                stylesheet += style;
            }
        }
        util.insertStyle(stylesheet, 'maker');

    },

    percentValue: function(value, standard){
        return (value / standard * 100).toFixed(0) + '%';
    },
    // use when renderng output html
    _adjustPosition: function(id){
        // var pageData = _.find()
        // var l = this.percentValue(left, SCREEN_WIDTH),
        //     t = this.percentValue(top, SCREEN_HEIGHT),
        //     w = this.percentValue(width, SCREEN_WIDTH),
        //     h = this.percentValue(height, SCREEN_HEIGHT);

    },

    //渲染
    flatStyle: function(obj){
        return JSON.stringify(obj).replace(/\\\"|\{|\}/g, '').replace(/\"/g, '').replace(/\,/g, ';').concat(';');
    },

    renderPage: function(callback){
        var idx = 0,
            data = pageData.list[idx],
            clone = _.cloneDeep(data),
            html = '';

        for(var i = 0; i < data.elements.length; i++){
            var it = data.elements[i],
                style = this.flatStyle(it.style),
                childStyle = this.flatStyle(it.childStyle);

            // console.log(it, style, childStyle);
            html += `<div class="editable" id="${it.id}" style="${style}">
                        <div class="inner" style="${childStyle}">
                            ${it.value}
                        </div>
                    </div>`;
            // console.log(html);
        }
        $('.page').eq(idx).find('.cont').html(html);
        callback && callback(clone);
    }

};

module.exports = core;