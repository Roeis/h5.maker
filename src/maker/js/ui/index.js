'use strict';

var core = {
    init: function(){
        $('[title]').tooltip({
            position: {
                my:'left bottom',
                at: 'left top'
            }
        });
    },
    create: function(){
        
    }
};

module.exports = core;