'use strict';

module.exports = {
    $doc: $(document),
    
    copy: function() {
        console.log(32);
    },

    insertStyle: function(styleSheet, styleID) {

        let style = document.createElement('style');
        let doc = document.head;
        style.id = styleID;
        doc.appendChild(style);

        style.appendChild(document.createTextNode(styleSheet));
    },

    tofixed10: function(value){
        var delta = value % 10,
            base = value / 10;
        return delta > 5 ? Math.ceil(base) * 10 : Math.floor(base) * 10;
    },
    
};