'use strict';

module.exports = {
    SCREEN_WIDTH : 360,
    SCREEN_HEIGHT : 540,

    tofixed10(value){
        let delta = value % 10,
            base = value / 10;
        return delta > 5 ? Math.ceil(base) * 10 : Math.floor(base) * 10;
    },

    rgba(color){
        let rgba = [];
        for(let key in color){
            if(color.hasOwnProperty(key)){
                rgba.push(color[key]);
            }
        }
        return 'rgba(' + rgba.join(',') + ')';
    },

    // DEPRECATED
    _insertStyle(styleSheet, styleID) {

        let style = document.createElement('style');
        let doc = document.head;
        style.id = styleID;
        doc.appendChild(style);

        style.appendChild(document.createTextNode(styleSheet));
    },

    percentValue(value, standard){
        return (value / standard * 100).toFixed(0) + '%';
    },

    //渲染
    flatStyle(obj){

        let str = _.map(obj, function(value, key){
            return key + ':' + value + ';';
        }).join('');

        return str;
    },
    $doc: $(document),
    $body: $('body'),
    $window: $(window),
    $wrapper: $('.wrapper'),
    $pagelist : $('#pageList'),
    $property: $('#property'),
    $helper: $('#helper'),
    $stage: $('#stage')
};
