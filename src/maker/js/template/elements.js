'use strict';

import _            from 'lodash';
import baseElem     from './baseElem.js';
import List         from './list.js';

var element = List.register('element', {
    id: 'toolElem',
    cn: '元素'
});

var list = element.list = {};

list.base = {
    author: 'roeis',
    name: '元素1',
    pic: 'http://www.hujiang.com/2010/images/default2015/logo.png',
    src: _.cloneDeep(baseElem)
};


list.btn = {
    author: 'roeis',
    name: '元素2',
    pic: 'http://i2.w.hjfile.cn/news/201504/201504092444697730.jpg',
    src: _.cloneDeep(baseElem)
};
_.assign(list.btn.src.style, {
    width: '200px',
    height: '50px',
    left: '80px',
    top: '300px'
});


list.video = {
    author: 'roeis',
    name: '元素3',
    pic: 'http://i2.w.hjfile.cn/news/201504/201504092444697730.jpg',
    src: _.cloneDeep(baseElem)
};
_.assign(list.video.src.style, {
    width: '300px',
    height: '200px',
    left: '30px',
    top: '100px'
});
_.assign(list.video.src.extra, {
    video: 'http://www.w3school.com.cn/i/movie.ogg',
});