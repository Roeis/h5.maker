'use strict';

module.exports = {
    $doc: $(document),
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


    percentValue(value, standard){
        return (value / standard * 100).toFixed(0) + '%';
    },

    //渲染
    flatStyle(obj){

        let str = _.map(obj, function(value, key){
            return key + ':' + value + ';';
        }).join('');
        // console.log(str)
        return str;
    },

    /**
     * 获取querystring
     * @param  {String} name
     * @return {String}
     */
    getQueryString: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
            r = window.location.search.substr(1).match(reg);

        if (r !== null) return window.unescape(r[2]);
        return null;
    },

    /**
     * encode 内容
     * @param  {string} str
     */
    htmlEncode: function(str) {
        var div = document.createElement('div'),
            text = document.createTextNode(str);
        div.appendChild(text);
        return div.innerHTML;
    },
    /**
     * decode 内容
     * @param  {string} str
     */
    htmlDecode: function(str) {
        var div = document.createElement('div');
        div.innerHTML = str;
        return div.innerText;
    },

    /**
     * 获取元素的类型
     * @param  {any} o 目标对象
     * @return {string}   'string', 'object', 'number' etc;
     */
    getType: function(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    },

    isNumber: function(obj){
        return this.getType(obj) === 'number';
    },
    isObject: function(obj){
        return this.getType(obj) === 'object';
    },
    isFunction: function(obj){
        return this.getType(obj) === 'function';
    },
    isArray: function(obj){
        return this.getType(obj) === 'array';
    },
    isString: function(obj){
        return this.getType(obj) === 'string';
    },

    /**
     * 动态加载样式
     * @param  {String} url 样式URL
     * @return
     */
    requireCss: function(url){
        var node = document.createElement('link'),
            head = document.getElementsByTagName('head');

        node.type = 'text/css';
        node.rel = 'stylesheet';
        node.href = url;
        head = head.length ? head[0] : document.documentElement;
        head.appendChild(node);
    }
};
