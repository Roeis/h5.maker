'use strict';

class Task {
    constructor(opts){
        this.opts = opts;
        this._init();
    }
    _init(){
        this.$el = $(this.opts.html);
        this.$parent = $(this.opts.parent);
        this.$parent.append(this.$el);
        this.$el.hide();
        this.init();
    }
    init(){
        this.opts.init.call(this);
        this.opts.bind.call(this);
        this.opts.register.call(this);
    }
}

module.exports = Task;
