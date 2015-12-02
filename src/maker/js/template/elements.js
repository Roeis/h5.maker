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
_.extend(list.base.src.child, {
    innerHtml: '<p>Base Example</p>'
});
_.extend(list.base.src.child.style, {
    'background-color': '#fff'
});


list.btn = {
    author: 'roeis',
    name: '元素2',
    pic: 'http://i2.w.hjfile.cn/news/201504/201504092444697730.jpg',
    src: _.cloneDeep(baseElem)
};
_.extend(list.btn.src.style, {
    width: '200px',
    height: '50px',
    left: '80px',
    top: '300px'
});


list.title = {
    author: 'roeis',
    name: '元素2',
    pic: 'http://i2.w.hjfile.cn/news/201504/sd.jpg',
    src: _.cloneDeep(baseElem)
};
_.extend(list.title.src.style, {
    width: '340px',
    height: '60px',
    left: '10px',
    top: '300px'
});
_.extend(list.title.src.child, {
    innerHtml: '<p>标题 Example</p>'
});
_.extend(list.title.src.child.style, {
    'font-size': '24px'
});



list.video = {
    author: 'roeis',
    name: '元素3',
    pic: 'http://i2.w.hjfile.cn/news/201504/201504092444697730.jpg',
    src: _.cloneDeep(baseElem)
};
_.extend(list.video.src.style, {
    width: '300px',
    height: '200px',
    left: '30px',
    top: '100px'
});
_.extend(list.video.src.extra, {
    video: 'http://www.w3school.com.cn/i/movie.ogg',
});
