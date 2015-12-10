'use strict';
import _         from 'lodash';
import stageData from '../data/stageData.js';
import pageData  from '../data/pageData.js';

var core = {
    /**
     * history is array , it includes each page's cache Data
     * a cache has a cursor , max and data store current page's Data
     * cursor controls the index of steps
     *
     */
    initStatus(){
        for(let i = 0; i < pageData.list.length; i++){
            this.push();
        }
        this.pushStep();
    },

    push(){
        stageData.caches.push({
            data: [],
            max: 20,
            cursor: -1,
        });
    },

    swap(oldIndex, newIndex){
        let temp = stageData.caches[oldIndex];

        stageData.caches.splice(oldIndex, 1);
        stageData.caches.splice(newIndex, 0, temp);
    },

    remove(){
        stageData.caches.splice(stageData.index, 1);
    },

    /**
     * operate in each cache
     */
    addStep(step){
        let cache = stageData.caches[stageData.index];

        cache.data = cache.data.slice(0, cache.cursor + 1);

        if(cache.data.length >= stageData.max){
            cache.data.shift();
        }
        cache.data.push(step);
        cache.cursor = cache.data.length - 1;

        this.renderStatus();
    },
    /**
     * 游标
     * flag > 0: 右移游标
     * flag < 0: 左移游标
     */
    _updateCursor(flag){
        let cache = stageData.caches[stageData.index];

        if(flag > 0){
            if(cache.cursor < cache.data.length - 1){
                cache.cursor ++;
            }
        }else{
            if(cache.cursor > 0){
                cache.cursor --;
            }
        }
    },

    _stepCallback(flag, callback){
        this._updateCursor(flag);
        let cache = stageData.caches[stageData.index],
            step = cache.data[cache.cursor];
        callback && callback(step);
    },

    redo(callback){
        this._stepCallback(1, callback);
        this.renderStatus();
    },

    undo(callback){
        this._stepCallback(-1, callback);
        this.renderStatus();
    },

    renderStatus(){
        let cache = stageData.caches[stageData.index];

        let html = `<div class="status">
                        <div class="st-total">
                            步数: ${cache.data.length}
                        </div>
                        <div class="st-cursor">
                            游标: ${cache.cursor}
                        </div>
                        <div class="st-page">
                            页码: ${stageData.index + 1}
                        </div>
                    </div>`;
        document.getElementById('status').innerHTML = html;
    },
    // 记录下当前页面的数据
    pushStep: function(){
        let index = stageData.index,
            data = pageData.list[index],
            clone = _.cloneDeep(data);
        this.addStep(clone);
    },
};

module.exports = core;
