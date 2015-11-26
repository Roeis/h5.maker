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
        'elements': [{
            'id': 'm_8',
            'type': 'default',
            'extra': {},
            'child': {
                'innerHtml': '',
                'style': {
                    'transform': 'rotate(0deg)',
                    'text-align': 'center',
                    'vertical-align': 'middle',
                    'font-size': '15px',
                    'color': '#f50',
                    'border-radius': '0px',
                    'background-color': '#fff',
                    'background-image': 'url(http://i2.w.hjfile.cn/news/201503/201503263340041851.jpg)'
                }
            },
            'style': {
                'animation-delay': '1s',
                'animation-duration': '1s',
                'animation-name': 'none',
                'height': '280px',
                'left': '0px',
                'opacity': 1,
                'top': '0px',
                'width': '360px',
                'z-index': 0
            }
        }, {
            'id': 'm_9',
            'type': 'default',
            'extra': {},
            'child': {
                'innerHtml': 'who is this character in animation \'One Piece\'',
                'style': {
                    'transform': 'rotate(0deg)',
                    'text-align': 'center',
                    'vertical-align': 'middle',
                    'font-size': '15px',
                    'color': '#f50',
                    'border-radius': '0px',
                    'background-color': '#fff',
                    'background-image': 'none'
                }
            },
            'style': {
                'animation-delay': '1s',
                'animation-duration': '1s',
                'animation-name': 'none',
                'height': '100px',
                'left': '0px',
                'top': '280px',
                'width': '360px'
            }
        }, {
            'id': 'm_10',
            'type': 'default',
            'extra': {},
            'child': {
                'innerHtml': 'Hot Question',
                'style': {
                    'background-color': 'rgba(249,93,0,1)',
                    'background-image': 'none',
                    'border-radius': '50px',
                    'color': '#fff',
                    'font-size': '15px',
                    'text-align': 'center',
                    'transform': 'rotate(30deg)',
                    'vertical-align': 'middle'
                }
            },
            'style': {
                'animation-delay': '0s',
                'animation-duration': '1s',
                'animation-name': 'wobble',
                'height': '70px',
                'left': '290px',
                'opacity': 1,
                'top': '240px',
                'width': '70px',
                'z-index': 0
            }
        }, {
            'id': 'm_11',
            'type': 'default',
            'extra': {},
            'child': {
                'innerHtml': 'Click here',
                'style': {
                    'background-color': 'rgba(214,39,16,1)',
                    'background-image': 'none',
                    'border-radius': '50px',
                    'color': '#fff',
                    'font-size': '15px',
                    'text-align': 'center',
                    'transform': 'rotate(0deg)',
                    'vertical-align': 'middle'
                }
            },
            'style': {
                'animation-delay': '0s',
                'animation-duration': '1s',
                'animation-name': 'none',
                'height': '60px',
                'left': '50px',
                'opacity': 1,
                'top': '430px',
                'width': '260px',
                'z-index': 0
            }
        }],
        'style': {
            'background': 'url(http://jsdf.com/sdf.jpg)',
            'backgounnd-color': '#fff'
        }
    }

};
