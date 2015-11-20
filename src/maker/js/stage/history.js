'use strict';
import stageData from '../model/stageData.js';

var core = {
    addStep(step){
        stageData.cache = stageData.cache.slice(0, stageData.cursor + 1);
        if(stageData.cache.length >= stageData.cacheMax){
            stageData.cache.shift();
        }
        stageData.cache.push(step);
        stageData.cursor = stageData.cache.length - 1;
        console.log(stageData.cache, stageData.cursor);
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
        var step = stageData.cache[stageData.cursor];
        callback && callback(step);
    },

    redo(callback){
        this._stepCallback(1, callback);
    },

    undo(callback){
        this._stepCallback(-1, callback);
    },

    clearLog(){
        stageData.cache = [];
        stageData.cursor = -1;
    }

};

module.exports = core;
