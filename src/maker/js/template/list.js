'use strict';

import _ from 'lodash';

var data = {};
const register = (id, value) => {
    let obj = {};
    obj[id] = value;
    _.assign(data, obj);
    return data[id];
};

module.exports = {
    data: data,
    register: register
};
