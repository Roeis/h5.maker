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
    _generateDom(data) {
        let html = `
            <div class="page">
                <div class="cont">
                `;
        let style = '', childStyle = '';
        for(let i = 0; i < data.length; i++){
            let it = data[i];
                html += `
                    <div class="elem" id="${it.id}" data-role="${it.type}">
                        <div class="inner">
                            ${it.child.innerHtml}
                        </div>
                    </div>
                    `;
                style = '#'+ it.id + '{' + this._generateStyle(it.style) + '}';
                childStyle = '#'+ it.id + ' .inner{' + this._generateStyle(it.child.style) + '}';

                console.log(style);
                console.log(childStyle);
            }
        html += `
                </div>
            </div>
            `;

        return html;
    },

    renderRealse(){
        let data = pageData.list,
            html = '';
        for(let i = 0; i < data.length; i++){
            let it  = data[i].elements;
            html += this._generateDom(it);
        }
        console.log(html);
    },

    _toPercent(key, value){
        let val = parseInt(value, 10);
        if(key === 'width' || key === 'left'){
            val = (val / util.SCREEN_WIDTH * 100).toFixed(2) + '%';
        }
        if(key === 'height' || key === 'top'){
            val = (val / util.SCREEN_HEIGHT * 100).toFixed(2) + '%';
        }
        return val;
    },

    // 渲染前台页面正式CSS结构，以<style>标签插入到前台页面head中
    _generateStyle(style) {
        // 过滤样式规则&补全
        let needPrefix  = [
            'animation-name',
            'animation-duration',
            'animation-delay',
            'transform'
        ];

        let needReCaculate = [
            'width',
            'height',
            'left',
            'top'
        ];

        style = _.cloneDeep(style);

        for(let i = 0; i < needReCaculate.length; i++){
            let value = style[needReCaculate[i]];
            if(value){
                style[needReCaculate[i]] = this._toPercent(needReCaculate[i], value);
            }
        }
        //处理宽高位置

        for (let i = 0; i < needPrefix.length; i++){
            // 处理webkit 前缀
            if(style[needPrefix[i]]){
                style['-webkit-' + needPrefix[i]] = style[needPrefix[i]];
            }
        }

        return util.flatStyle(style);
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
    /**
     * 渲染单个元素，避免整页动画重渲染
     */
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

    /**
     * 渲染数量减少为当前元素，历史记录为当前页面
     */
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
