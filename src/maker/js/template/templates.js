'use strict';

import _            from 'lodash';
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

//http://i2.w.hjfile.cn/news/201503/201503302253810187.jpg para

list.template1 = {
    author: 'roeis',
    name: '模板名称',
    pic: 'http://i2.w.hjfile.cn/news/201503/201503264503973418.jpg',
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
                    'background-size': '100% auto',
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
                    'background-size': '100% auto',
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
                'width': '360px',
                'z-index': 0
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
                    'background-size': '100% auto',
                    'border-radius': '50px',
                    'color': '#fff',
                    'font-size': '15px',
                    'text-align': 'center',
                    'transform': 'rotate(30deg)',
                    'vertical-align': 'middle',
                    'padding': 0
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
                    'background-size': '100% auto',
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
            'background-image': 'url(http://i2.w.hjfile.cn/news/201503/201503263340041851.jpg)',
            'background-color': '#fff',
            'background-size': 'auto 100%',
        }
    }

};







list.template2 = {
    author: 'roeis',
    name: '模板名称',
    pic: 'http://i2.w.yun.hjfile.cn/news/201501302081011823.jpg',
    src: {
        "elements": [{
            "id": "m_7",
            "type": "default",
            "extra": {
                "link": "",
                "audio": "",
                "video": "",
                "analyze": "",
                "jump": ""
            },
            "child": {
                "innerHtml": "<p><br></p>",
                "style": {
                    "background-image": "url(http://i2.w.hjfile.cn/news/201503/201503263340041851.jpg)",
                    "background-color": "rgba(255,255,255,1)",
                    "background-size": "100% auto",
                    "color": "#333",
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
                "height": "280px",
                "left": "10px",
                "top": "10px",
                "z-index": 0,
                "animation-name": "none",
                "animation-duration": "1s",
                "animation-delay": "0s",
                "opacity": 1
            }
        }, {
            "id": "m_8",
            "type": "default",
            "extra": {
                "link": "",
                "audio": "",
                "video": "",
                "analyze": "",
                "jump": ""
            },
            "child": {
                "innerHtml": "<p>Hello, everyone<br></p>",
                "style": {
                    "background-image": "none",
                    "background-color": "rgba(255,255,255,0)",
                    "background-size": "100% auto",
                    "color": "#333",
                    "font-size": "24px",
                    "text-align": "left",
                    "vertical-align": "middle",
                    "border-radius": "0",
                    "padding": "20px",
                    "transform": "rotate(0deg)"
                }
            },
            "style": {
                "width": "360px",
                "height": "48px",
                "left": "0px",
                "top": "290px",
                "z-index": 0,
                "animation-name": "fadeInUp",
                "animation-duration": "1s",
                "animation-delay": "0s",
                "opacity": 0
            }
        }, {
            "id": "m_9",
            "type": "default",
            "extra": {
                "link": "",
                "audio": "",
                "video": "",
                "analyze": "",
                "jump": ""
            },
            "child": {
                "innerHtml": "<p><span style=\"line-height: 1.42857;\">i'm h5.maker, u can make a h5 page rapidly and easily.</span><br></p><p>if u have any problem, contact me.</p>",
                "style": {
                    "background-image": "none",
                    "background-color": "rgba(255,255,255,0)",
                    "background-size": "100% auto",
                    "color": "#333",
                    "font-size": "18px",
                    "text-align": "left",
                    "vertical-align": "top",
                    "border-radius": "0",
                    "padding": "20px",
                    "transform": "rotate(0deg)"
                }
            },
            "style": {
                "width": "360px",
                "height": "160px",
                "left": "0px",
                "top": "350px",
                "z-index": 0,
                "animation-name": "fadeInUp",
                "animation-duration": "1s",
                "animation-delay": "0.3s",
                "opacity": 0
            }
        }],
        "style": {
            "background-image": "none",
            "background-color": "rgba(255,255,255,1)",
            "background-size": "auto 100%"
        }
    }
};
