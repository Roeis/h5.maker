'use strict';

import _            from 'lodash';
import baseElem     from './baseElem.js';
import List         from './list.js';

var template = List.register('template', {
    id: 'toolTmpl',
    cn: '模板'
});

var list = template.list = {};

//http://i2.w.yun.hjfile.cn/news/2015020211234465694.jpg
//http://i2.w.yun.hjfile.cn/news/201501302081011823.jpg
//http://i2.w.hjfile.cn/news/201503/201503264434009167.jpg
//http://i2.w.hjfile.cn/news/201503/201503264503973418.jpg
//http://i2.w.hjfile.cn/news/201503/201503265020906725.jpg
//
//http://i2.w.hjfile.cn/news/201503/201503302221505845.jpg title
//http://i2.w.hjfile.cn/news/201503/201503302253810187.jpg para
//http://i2.w.hjfile.cn/news/201503/201503302231831210.jpg pic
//http://i2.w.hjfile.cn/news/201503/201503302233840644.jpg audio
//http://i2.w.hjfile.cn/news/201503/201503302244522319.jpg link
//http://i2.w.hjfile.cn/news/201506/201506101164650169.jpg jump
//http://i2.w.hjfile.cn/news/201503/201503302272062291.jpg video
//
//http://i2.w.hjfile.cn/news/201506/201506263441245184.jpg qq
//
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


list.template2 = {
    author: 'roeis',
    name: '模板名称',
    pic: 'http://www.hujiang.com/2010/images/default2015/logo.png',
    src: {
        "elements": [{
            "id": "m_8",
            "type": "default",
            "extra": {
                "link": "",
                "audio": "",
                "video": "",
                "analyze": ""
            },
            "child": {
                "innerHtml": "<img src=\"http://i2.w.hjfile.cn/news/201511/201511259323552698.jpg\">",
                "style": {
                    "background-image": "url(http://i2.w.hjfile.cn/news/201511/201511259323552698.jpg)",
                    "background-color": "rgba(165,132,132,1)",
                    "color": "#fff",
                    "font-size": "14px",
                    "text-align": "center",
                    "vertical-align": "middle",
                    "border-radius": "0",
                    "padding": 0,
                    "transform": "rotate(0deg)"
                }
            },
            "style": {
                "width": "340px",
                "height": "200px",
                "left": "10px",
                "top": "10px",
                "z-index": 0,
                "animation-name": "fadeInDown",
                "animation-duration": "3s",
                "animation-delay": "0s",
                "opacity": 1
            }
        }, {
            "id": "m_10",
            "type": "default",
            "extra": {
                "link": "",
                "audio": "",
                "video": "",
                "analyze": ""
            },
            "child": {
                "innerHtml": "",
                "style": {
                    "background-image": "none",
                    "background-color": "#fff",
                    "color": "#fff",
                    "font-size": "14px",
                    "text-align": "center",
                    "vertical-align": "middle",
                    "border-radius": "0",
                    "padding": 0,
                    "transform": "rotate(0deg)"
                }
            },
            "style": {
                "width": "160px",
                "height": "140px",
                "left": "190px",
                "top": "220px",
                "z-index": 0,
                "animation-name": "fadeInRight",
                "animation-duration": "1s",
                "animation-delay": "0s",
                "opacity": 1
            }
        }, {
            "id": "m_12",
            "type": "default",
            "extra": {
                "link": "",
                "audio": "",
                "video": "",
                "analyze": ""
            },
            "child": {
                "innerHtml": "",
                "style": {
                    "background-image": "none",
                    "background-color": "#fff",
                    "color": "#fff",
                    "font-size": "14px",
                    "text-align": "center",
                    "vertical-align": "middle",
                    "border-radius": "0",
                    "padding": 0,
                    "transform": "rotate(0deg)"
                }
            },
            "style": {
                "width": "160px",
                "height": "140px",
                "left": "10px",
                "top": "220px",
                "z-index": 0,
                "animation-name": "fadeInLeft",
                "animation-duration": "1s",
                "animation-delay": "0s",
                "opacity": 1
            }
        }, {
            "id": "m_14",
            "type": "default",
            "extra": {
                "link": "",
                "audio": "",
                "video": "",
                "analyze": ""
            },
            "child": {
                "innerHtml": "click here",
                "style": {
                    "background-image": "none",
                    "background-color": "rgba(232,28,28,1)",
                    "color": "#fff",
                    "font-size": "36px",
                    "text-align": "center",
                    "vertical-align": "middle",
                    "border-radius": "50px",
                    "padding": 0,
                    "transform": "rotate(0deg)"
                }
            },
            "style": {
                "width": "280px",
                "height": "60px",
                "left": "40px",
                "top": "430px",
                "z-index": 0,
                "animation-name": "fadeInUp",
                "animation-duration": "1s",
                "animation-delay": "0s",
                "opacity": 1
            }
        }],
        "style": {
            "background": "url(\"http://jsdf.com/sdf.jpg\")",
            "backgounnd-color": "#fff"
        }
    }
};
