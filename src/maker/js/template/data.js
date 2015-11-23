'use strict';

import list from './list.js';

var files = [
    'elements',
    'templates',
    'resources',
    'apis',
];

for(var i = 0; i < files.length; i++){
    require('./'+files[i]+ '.js');
}

module.exports = list.data;