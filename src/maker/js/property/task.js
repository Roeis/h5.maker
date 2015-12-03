'use strict';

class Task {
    constructor(opts){
        this.opts = opts;
    }
    _init(){
        this.$el = $(this.opts.html);
        this.$target = $(this.opts.target);
        this.$target.append(this.$el);
        this.$el.hide();
        this.init();
        this.bind();
    }
    init(){}
    bind(){}
}

module.exports = Task;
