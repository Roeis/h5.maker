'use strict';

var core = {
    cache: [],
    count: 20,
    cursor: -1,

    addStep(step){
        this.cache = this.cache.slice(0, this.cursor + 1);
        if(this.cache.length >= this.count){
            this.cache.shift();
        }
        this.cache.push(step);
        this.cursor = this.cache.length - 1;
        console.log(this.cache, this.cursor);
    },
    /**
     * 游标
     * flag > 0: 增加游标
     */
    _updateCursor(flag){
        if(flag > 0){
            if(this.cursor < this.cache.length - 1){
                this.cursor ++;
            }
        }else{
            if(this.cursor > 0){
                this.cursor --;
            }
        }
    },

    _stepCallback(flag, callback){
        this._updateCursor(flag);
        var step = this.cache[this.cursor];
        callback && callback(step);
    },

    redo(callback){
        this._stepCallback(1, callback);
    },

    undo(callback){
        this._stepCallback(-1, callback);
    },

    clearLog(){
        this.cache = [];
        this.cursor = -1;
    }

};

module.exports = core;
