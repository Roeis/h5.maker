'use strict';

import _            from 'lodash';
import util         from '../biz/util.js';
import stageData    from '../data/stageData.js';
import pageData     from '../data/pageData.js';
import template     from '../template/data.js';
import render       from '../page/render.js';

/**
 *
 * 多元素 水平居中， 居左， 居右
 * 多元素 垂直居中， 居左， 居右
 *
 * 单元素 自动调整
 * 多元素 自动调整
 *
 * 单元素 拷贝 剪切 粘贴
 *
 */
var core = {
    // 新增元素，clone then plus id
    addElem(cate, id, callback){
        let elem = _.cloneDeep(template[cate].list[id].src);

        stageData.countID ++;
        elem.id = 'm_' + stageData.countID;
        callback && callback(elem);
        pageData.list[stageData.index].elements.push(elem);

    },

    // 填充模板页面
    replacePage(cate, id){
        let clone = _.cloneDeep(template[cate].list[id].src);
        console.log(clone);
        // add id for every element in copy
        _.forEach(clone.elements, (value, key) => {
            stageData.countID ++;
            value.id = 'm_' + stageData.countID;
        });

        pageData.list[stageData.index] = clone;
    },

    removeElem(){
        let current = pageData.list[stageData.index],
            index = _.findIndex(current.elements, {id: stageData.curElem.id});
        current.elements.splice(index, 1);
    },

    copyElem(){
        stageData.clone = stageData.curElem;
    },

    pasteElem(callback){
        let clone = _.cloneDeep(stageData.clone);
        stageData.countID ++;
        clone.id = 'm_' + stageData.countID;

        callback && callback(clone);
        pageData.list[stageData.index].elements.push(clone);
    },

    /**
     * 水平居中
     */
    _horiCenterlize(){
        let curElem = stageData.curElem,
            w = parseInt(curElem.style.width, 10),
            l = (util.SCREEN_WIDTH - w) / 2;

        curElem.style.left = l + 'px';
    },

    horiCenterlize(){
        this._horiCenterlize();
        render.renderStep();
    },

    /**
     * 垂直居中
     */
    _vertCenterlize(){
        let curElem = stageData.curElem,
            h = parseInt(curElem.style.height, 10),
            t = (util.SCREEN_HEIGHT - h) / 2;

        curElem.style.top = t + 'px';
    },

    vertCenterlize(){
        this._vertCenterlize();
        render.renderStep();
    },

    /**
     * 居中
     */
    centerlize(){
        this._vertCenterlize();
        this._horiCenterlize();
        render.renderStep();
    },

    /**
     * 获取当前元素的位置尺寸
     */
    getSize(){
        let curElem = stageData.curElem;
        return {
            l: parseInt(curElem.style.left, 10),
            t: parseInt(curElem.style.top),
            w: parseInt(curElem.style.width),
            h: parseInt(curElem.style.height)
        };
    },

    _autoAdjust(){
        let size = this.getSize(),
            w = util.tofixed10(size.w),
            h = util.tofixed10(size.h),
            l = util.tofixed10(size.l),
            t = util.tofixed10(size.t);
        // console.log(w, h, l ,t);
        _.extend(stageData.curElem.style,{
            left: l + 'px',
            top: t + 'px',
            width: w + 'px',
            height: h + 'px'
        });
    },
    /**
     * 自动修正尺寸，趋向于10的倍数
     */
    autoAdjust(){
        this._autoAdjust();
        render.renderStep();
    },

    alignCallback(){

    },

    align(direction){
        switch(direction){
            case 'up':
                break;
            case 'down':
                break;
            case 'right':
                break;
            case 'left':
                break;
        }
    },

    turn3d(){
        $('#stage').toggleClass('stage3D');
    },

    init(){
        this._create();
        this._bind();
    },

    $el: $('#page'),

    _create(){
        let html = `<div class="quick-key">
                        <a class="btn btn-default" data-role="horiCenterlize">水平居中</a>
                        <a class="btn btn-default" data-role="vertCenterlize">垂直居中</a>
                        <a class="btn btn-default" data-role="centerlize">全屏居中</a>
                        <a class="btn btn-default" data-role="autoAdjust">自动修正</a>
                        <a class="btn btn-default" data-role="turn3d">3D模式</a>
                    </div>`;
        this.$el.append(html);
    },

    _bind(){
        let self = this;
        this.$el.on('click', '.quick-key a', function(){
            let role = $(this).data('role');
            console.log(role);
            self[role]();
        });
    }

};

module.exports = core;