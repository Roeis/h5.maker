'use strict';
import qrcode from './qrcode.js';
import warn from './warning.js';

var core = {
    init(){
        qrcode.init();
        this.tooltip();
        warn.init();
    },
    tooltip(){
        $('[title]').tooltip({
            position: {
                my:'left bottom',
                at: 'left top'
            }
        });
    }
};

module.exports = core;