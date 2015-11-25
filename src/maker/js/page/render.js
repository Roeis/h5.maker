'use strict';
import _            from 'lodash';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import util         from '../biz/util.js';
import history      from '../stage/history.js';

var core = {
    /**
     * in editor env, it render in inline-style,
     * in realease env, DOM and Style will be seperated,
     * Style will be put into a style tag in head
     * elements map style with their id
     */

    // 渲染前台页面正式DOM结构，区别于编辑器渲染
    renderDomRealease() {
        let html = '',
            curData = pageData.list[stageData.index];
        for(let i = 0; i < curData.elements.length; i++){
            let it = curData.elements[i];
            html += `<div class="editable" id="${it.id}">
                            <div class="inner">
                                ${it.child.innerHtml}
                            </div>
                        </div>`;
        }
        return html;
    },

    // 渲染前台页面正式CSS结构，以<style>标签插入到前台页面head中
    generateStyle(style) {
        // 过滤样式规则&补全
        let needPrefix  = [
            'animation-name',
            'animation-duration',
            'animation-delay',
            'transform'
        ];

        for (let i = 0; i < needPrefix.length; i++){
            if(style[needPrefix[1]]){
                style['-webkit-' + needPrefix[1]] = style[needPrefix[1]];
            }
        }

        return util.flatStyle(style);
    },

    // DEPRECATED
    _insertStyle(styleSheet, styleID) {

        let style = document.createElement('style');
        let doc = document.head;
        style.id = styleID;
        doc.appendChild(style);

        style.appendChild(document.createTextNode(styleSheet));
    },
    // DEPRECATED
    _renderStyle() {
        let stylesheet = '';
        for(let i = 0; i < pageData.list.length; i++){
            for(let j = 0; j < pageData.list[i].elements.length; j++){
                let it = pageData.list[i].elements[j];
                let style = this.stringifyStyle(it);
                stylesheet += style;
            }
        }
        this.insertStyle(stylesheet, 'maker');

    },

    // 渲染单页，当前
    renderPage(){

        let idx = stageData.index,
            data = pageData.list[idx],
            html = '';

        for(let i = 0; i < data.elements.length; i++){
            let it = data.elements[i],
                style = util.flatStyle(it.style),
                childStyle = util.flatStyle(it.child.style);

            html += `<div class="editable" id="${it.id}" style="${style}">
                        <div class="inner" style="${childStyle}">
                            ${it.child.innerHtml}
                        </div>
                    </div>`;
        }

        $('.page').eq(0).find('.cont').html(html);
    },

    renderElem(){
        let it = stageData.curElem,
            $target = $('#' + it.id),
            style = util.flatStyle(it.style),
            childStyle = util.flatStyle(it.child.style);

        $target.attr('style', style);
        $target.html(`<div class="inner" style="${childStyle}">
                        ${it.child.innerHtml}
                    </div>`);
    },

    // 渲染数量减少为当前元素，历史记录为当前页面
    renderStep(){
        this.renderElem();
        // this.renderPage();
        history.pushStep();
        if(stageData.curElem){
            $('#' + stageData.curElem.id).trigger('click');
        }
    },

};

module.exports = core;
