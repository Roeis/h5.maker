'use strict';

import _            from 'lodash';
import baseElem     from './baseElem.js';
import List         from './list.js';

var template = List.register('template', {
    id: 'toolTmpl',
    cn: '模板'
});

var list = template.list = {};

list.template1 = {
    author: 'roeis',
    name: '模板名称',
    pic: 'http://www.hujiang.com/2010/images/default2015/logo.png',
    src: {
        elements: [
            {
                id: 'm_2',
                type: 'btn',
                innerHtml: '',
                childStyle: {
                    'transform': 'rotate(0deg)',
                    'text-align': 'center',
                    'vertical-align': 'middle',
                    'font-size': '15px',
                    'color': '#f50',
                    'border-radius': '0px',
                    'background-color': '#fff',
                    'background-image': 'url(http://i2.w.hjfile.cn/news/201503/201503263340041851.jpg)'
                },
                style: {
                    'left': 0,
                    'top': 0,
                    'width': '360px',
                    'height': '280px',
                    'z-index': 0,
                    'animation-name': 'none',
                    'animation-duration': '1s',
                    'animation-delay': '1s',
                    'opacity': 1
                }
            },
            {
                id: 'm_3',
                type: 'btn',
                innerHtml: '<div class="inner"></div>',
                childStyle: {
                    'transform': 'rotate(0deg)',
                    'text-align': 'center',
                    'vertical-align': 'middle',
                    'font-size': '15px',
                    'color': '#f50',
                    'border-radius': '0px',
                    'background-color': '#fff',
                    'background-image': 'none'
                },
                style: {
                    'left': '40px',
                    'top': '400px',
                    'width': '50px',
                    'height': '50px',
                    'animation-name': 'wobble',
                    'animation-duration': '1s',
                    'animation-delay': '1s'
                }
            }
        ],
        style: {
            'background': 'url("http://jsdf.com/sdf.jpg")',
            'backgounnd-color': '#fff'
        }
    }
};
