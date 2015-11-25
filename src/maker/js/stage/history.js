'use strict';
import _         from 'lodash';
import stageData from '../data/stageData.js';
import pageData  from '../data/pageData.js';

var core = {
    addStep(step){
        stageData.cache = stageData.cache.slice(0, stageData.cursor + 1);
        if(stageData.cache.length >= stageData.cacheMax){
            stageData.cache.shift();
        }
        stageData.cache.push(step);
        stageData.cursor = stageData.cache.length - 1;

        this.renderHistory();
    },
    /**
     * 游标
     * flag > 0: 右移游标
     * flag < 0: 左移游标
     */
    _updateCursor(flag){
        if(flag > 0){
            if(stageData.cursor < stageData.cache.length - 1){
                stageData.cursor ++;
            }
        }else{
            if(stageData.cursor > 0){
                stageData.cursor --;
            }
        }
    },

    _stepCallback(flag, callback){
        this._updateCursor(flag);
        let step = stageData.cache[stageData.cursor];
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

    clear(){
        stageData.cache = [];
        stageData.cursor = -1;
    },

    container: document.getElementById('history'),

    renderHistory(){
        let html = `<div class="history">
                        <div class="total">
                            steps: ${stageData.cache.length}
                        </div>
                        <div class="cursor">
                            cursor: ${stageData.cursor}
                        </div>
                        <div class="page">
                            page: ${stageData.index + 1}
                        </div>
                    </div>`;
        this.container.innerHTML = html;
    },
    pushStep: function(){
        let index = stageData.index,
            data = pageData.list[index],
            clone = _.cloneDeep(data);
        this.addStep(clone);
    },
};

module.exports = core;
