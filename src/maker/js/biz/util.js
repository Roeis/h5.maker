'use strict';

module.exports = {
    $doc: $(document),
    SCREEN_WIDTH : 360,
    SCREEN_HEIGHT : 540,

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
    rgb2hex : function(rgb) {

        if (rgb.indexOf('#') > -1) {
            return {
                hex: rgb,
                opacity: 1
            };
        } else {
            var rgba = rgb.split('(')[1].split(')')[0].split(','),
                hex = [
                    parseInt(rgba[0]).toString(16),
                    parseInt(rgba[1]).toString(16),
                    parseInt(rgba[2]).toString(16)
                ],
                opacity = rgba.length === 4 ? rgba[3] : 1;

            $.each(hex, function(idx, val) {
                if (val.length === 1){
                    hex[idx] = '0' + val;
                }
            });
            return {
                hex: '#' + hex.join(''),
                opacity: opacity
            };
        }
    },

    percentValue: function(value, standard){
        return (value / standard * 100).toFixed(0) + '%';
    },

    //渲染
    flatStyle: function(obj){

        var str = _.map(obj, function(value, key){
            return key + ':' + value + ';';
        }).join('');
        // console.log(str)
        return str;
    },
};
