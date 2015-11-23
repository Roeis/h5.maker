'use strict';
import _ from 'lodash';

module.exports = {
    events: {},
    register: function(name, callback){
        var task = {};
        task[name] = callback;
        _.extend(this.events, task);
    },
    $el: $('#editPanel')
};