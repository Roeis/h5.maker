'use strict';
import Data from '../model/data.js';

var core = {
    addStep(step){
        Data.cache = Data.cache.slice(0, Data.cursor + 1);
        if(Data.cache.length >= Data.cacheMax){
            Data.cache.shift();
        }
        Data.cache.push(step);
        Data.cursor = Data.cache.length - 1;
        console.log(Data.cache, Data.cursor);
    },
    /**
     * 游标
     * flag > 0: 增加游标
     */
    _updateCursor(flag){
        if(flag > 0){
            if(Data.cursor < Data.cache.length - 1){
                Data.cursor ++;
            }
        }else{
            if(Data.cursor > 0){
                Data.cursor --;
            }
        }
    },

    _stepCallback(flag, callback){
        this._updateCursor(flag);
        var step = Data.cache[Data.cursor];
        callback && callback(step);
    },

    redo(callback){
        this._stepCallback(1, callback);
    },

    undo(callback){
        this._stepCallback(-1, callback);
    },

    clearLog(){
        Data.cache = [];
        Data.cursor = -1;
    }

};

module.exports = core;
