'use strict';
import _            from 'lodash';
import pageData     from '../data/pageData.js';
import stageData    from '../data/stageData.js';
import history      from '../stage/history.js';
import util         from '../biz/util.js';
/**
 * in editor env, it render in inline-style,
 * in realease env, DOM and Style will be seperated,
 * Style will be put into a style tag in head
 * elements map style with their id
 */
var core = {

    // ==========================================
    // 生产环境
    // ==========================================

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

        // 处理宽高位置
        for(let i = 0; i < needReCaculate.length; i++){
            let value = style[needReCaculate[i]];
            if(value){
                style[needReCaculate[i]] = this._toPercent(needReCaculate[i], value);
            }
        }
        // 处理webkit 前缀
        for (let i = 0; i < needPrefix.length; i++){
            if(style[needPrefix[i]]){
                style['-webkit-' + needPrefix[i]] = style[needPrefix[i]];
            }
        }

        return util.flatStyle(style);
    },

    // 渲染前台页面正式DOM结构，区别于编辑器渲染
    _generateOne(data, index) {
        let html = `<div class="page page-${index}">
                        <div class="cont">`,
            style = '';
        for(let i = 0; i < data.length; i++){
            let it = data[i];
                let analyzeAttr = it.extra.analyze ? ` data-analyze="${it.extra.analyze}"` : ``;
                let valueAttr   = it.extra[it.type] ? ` data-value="${it.extra[it.type]}"` : ``;
                html += `<div class="elem" id="${it.id}" data-role="${it.type}"${valueAttr}${analyzeAttr}>
                            <div class="inner">
                                ${it.child.innerHtml}
                            </div>
                        </div>`;
                style += `#${it.id}{${this._generateStyle(it.style)}}\n`;
                style += `#${it.id} .inner{${this._generateStyle(it.child.style)}}\n`;
            }

        html += `</div></div>`;

        return {
            html: html,
            style: style
        };
    },

    /**
     * 生成 生产环境样式
     */
    renderRelease(){
        let list = pageData.list,
            html = '',
            style = '';
        for(let i = 0; i < list.length; i++){
            let it = list[i],
                output = this._generateOne(it.elements, i),
                pageStyle = `.page-${i}{` + util.flatStyle(it.style) + `}\n`;
            html += output.html;
            style += pageStyle + output.style;
        }
        style = `.wrapper{` + util.flatStyle(pageData.setting.style) + `}\n` + style;
        pageData.output.html = html;
        pageData.output.style = style;
        console.log(html)
        console.log(style)

    },



    // ==========================================
    // 编辑环境
    // ==========================================

    _listLoop(callback){
        for(let i = 0; i < pageData.list.length; i++){
            callback(i);
        }
    },

    renderUi(){
        this.resetPageHtml();
        this.resetPageUi();
    },

    //
    resetPageHtml(){
        let html = '',
            self = this;
        this._listLoop(function(i){
            html += `<div class="page"></div>`;
        });

        util.$wrapper.html(html);
        this.$page = util.$wrapper.find('.page');

        this._listLoop(function(i){
            self.renderHtmlPage(i);
        });
    },

    resetPageUi(){
        let self = this,
            mode = pageData.setting.mode,
            isLoop = pageData.setting.isLoop;

        this.slider = new MuPage('.page', {
            isLoop: isLoop,
            pageStart: stageData.index,
            mode: mode,
            beforeSlide: function($pagein, $pageout) {

            },
            afterSlide: function($pagein, $pageout, index) {

                util.$stage.trigger('click');
            }
        });
        util.$stage.trigger('click');
    },

    renderPageList(idx){
        let html = ``;
        idx = idx || stageData.index;
        for(let i = 0; i < pageData.list.length; i++){
            let active = i === idx ? 'active' : '';
            html += `<div class="page-li ${active}">${i + 1}</div>`;
        }
        html += `</div>`;

        util.$pagelist.find('.page-ul').html(html);
    },

    // 渲染单页，当前
    renderHtmlPage(idx){

        let data = pageData.list[idx],
            $page = this.$page.eq(idx),
            pageStyle = util.flatStyle(data.style),
            html = `<div class="cont">`;

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
        html += `</div>`;

        $page.html(html).attr('style', pageStyle);
    },

    /**
     * 渲染单个元素，避免整页动画重渲染
     */
    renderHtmlElem(){
        let it = stageData.curElem,
            $elem = $('#' + it.id),
            style = util.flatStyle(it.style),
            childStyle = util.flatStyle(it.child.style),
            html = `<div class="inner" style="${childStyle}">
                        ${it.child.innerHtml}
                    </div>`;

        $elem.attr('style', style);
        $elem.html(html);
    },

    /**
     * 渲染数量减少为当前元素，历史记录为当前页面
     */
    logElemStep(){
        this.renderHtmlElem();
        history.pushStep();
        if(stageData.curElem){
            $('#' + stageData.curElem.id).trigger('click');
        }
    },

    logPageStep(){
        this.renderHtmlPage(stageData.index);
        history.pushStep();

        util.$stage.trigger('click');
    },

};

module.exports = core;
