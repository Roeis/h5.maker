'use strict';
import _            from 'lodash';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import util         from '../biz/util.js';
import history      from '../stage/history.js';

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

    // 渲染单页，当前
    renderPage: function(){

        var idx = stageData.index,
            data = pageData.list[idx],
            html = '';

        for(var i = 0; i < data.elements.length; i++){
            var it = data.elements[i],
                style = util.flatStyle(it.style),
                childStyle = util.flatStyle(it.childStyle);

            html += `<div class="editable" id="${it.id}" style="${style}">
                        <div class="inner" style="${childStyle}">
                            ${it.innerHtml}
                        </div>
                    </div>`;
        }

        $('.page').eq(0).find('.cont').html(html);
    },

    renderElem: function(){
        var it = stageData.curElem,
            $target = $('#' + it.id),
            style = util.flatStyle(it.style),
            childStyle = util.flatStyle(it.childStyle);

        $target.attr('style', style);
        $target.html(`<div class="inner" style="${childStyle}">
                        ${it.innerHtml}
                    </div>`);
    },

    pushHistory: function(){
        var index = stageData.index,
            data = pageData.list[index],
            clone = _.cloneDeep(data);
        history.addStep(clone);
    },
    
    // 渲染数量减少为当前元素，历史记录为当前页面
    renderStep: function(){
        this.renderElem();
        // this.renderPage();
        this.pushHistory();
        if(stageData.curElem){
            $('#' + stageData.curElem.id).trigger('click');
        }
    },

};

module.exports = core;