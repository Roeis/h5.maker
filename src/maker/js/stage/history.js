'use strict';
import _         from 'lodash';
import stageData from '../data/stageData.js';
import pageData  from '../data/pageData.js';

var core = {

    initStatus(){
        for(let i = 0; i < pageData.list.length; i++){
            this.push();
        }
        this.pushStep();
    },

    push(){
        stageData.caches.push({
            data: [],
            cacheMax: 20,
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

    addStep(step){
        let cache = stageData.caches[stageData.index];

        cache.data = cache.data.slice(0, cache.cursor + 1);

        if(cache.data.length >= stageData.cacheMax){
            cache.data.shift();
        }
        cache.data.push(step);
        cache.cursor = cache.data.length - 1;

        this.renderHistory();
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
        this.renderHistory();
    },

    undo(callback){
        this._stepCallback(-1, callback);
        this.renderHistory();
    },

    change(){

    },

    clear(){
        // stageData.cache = [];
        // stageData.cursor = -1;
    },

    container: document.getElementById('history'),

    renderHistory(){
        let cache = stageData.caches[stageData.index];
        let html = `<div class="history">
                        <div class="total">
                            steps: ${cache.data.length}
                        </div>
                        <div class="cursor">
                            cursor: ${cache.cursor}
                        </div>
                        <div class="page">
                            page: ${stageData.index + 1}
                        </div>
                    </div>`;
        this.container.innerHTML = html;
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
