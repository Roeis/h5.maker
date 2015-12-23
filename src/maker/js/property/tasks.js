'use strict';
import _        from 'lodash';

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

var core = {

    events: {},
    // 注册一个事件
    register(name, opts){
        // 注册一个新的任务
        let task = new Task({
            html: opts.html,
            target: opts.target
        });

        _.extend(task, opts);
        task._init();

        let event = {};
        event[name] = (value) => {
            task.callback(value);
        };
        _.extend(this.events, event);
        // events[name](value);
    }
};

module.exports = core;
