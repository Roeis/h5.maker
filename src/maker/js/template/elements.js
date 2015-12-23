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
    name: '基础元件',
    pic: 'http://i2.w.hjfile.cn/news/201512/201512161120777071.png',
    src: {
        id: 'm_0',
        type: 'default',
        extra: {
            link: '',
            audio: '',
            video: '',
            analyze: '',
            jump: ''
        },
        child: {
            innerHtml: '<p>base</p>',
            style: {
                'background-image': 'none',
                'background-color': 'rgba(255,255,255,1)',
                'background-size': '100% auto',
                'color': '#333',
                'font-size': '14px',
                'text-align': 'center',
                'vertical-align': 'middle',
                'border-radius': '0',
                'padding': 0,
                'transform': 'rotate(0deg)'
            },
        },
        style: {
            'width': '160px',
            'height': '100px',
            'left': '100px',
            'top': '200px',
            'z-index': 0,
            'animation-name': 'none',
            'animation-duration': '1s',
            'animation-delay': '0s',
            'opacity': 1
        }
    }
};








list.title = {
    author: 'roeis',
    name: '标题',
    pic: 'http://i2.w.hjfile.cn/news/201503/201503302221505845.jpg',
    src: {
        id: 'm_0',
        type: 'default',
        extra: {
            link: '',
            audio: '',
            video: '',
            analyze: '',
            jump: ''
        },
        child: {
            innerHtml: '<p>Title 标题</p>',
            style: {
                'background-image': 'none',
                'background-color': 'rgba(255,255,255,1)',
                'background-size': '100% auto',
                'color': '#333',
                'font-size': '24px',
                'text-align': 'center',
                'vertical-align': 'middle',
                'border-radius': '5px',
                'padding': 0,
                'transform': 'rotate(0deg)'
            },
        },
        style: {
            'width': '280px',
            'height': '100px',
            'left': '40px',
            'top': '0px',
            'z-index': 0,
            'animation-name': 'none',
            'animation-duration': '1s',
            'animation-delay': '0s',
            'opacity': 1
        }
    }
};







list.link = {
    author: 'roeis',
    name: '链接',
    pic: 'http://i2.w.hjfile.cn/news/201503/201503302244522319.jpg',
    src: {
        id: 'm_0',
        type: 'link',
        extra: {
            link: 'http://m.hujiang.com',
            audio: '',
            video: '',
            analyze: '',
            jump: ''
        },
        child: {
            innerHtml: '<p>链接按钮</p>',
            style: {
                'background-image': 'none',
                'background-color': 'rgba(27,181,44,1)',
                'background-size': '100% auto',
                'color': '#fff',
                'font-size': '18px',
                'text-align': 'center',
                'vertical-align': 'middle',
                'border-radius': '5px',
                'padding': 0,
                'transform': 'rotate(0deg)'
            },
        },
        style: {
            'width': '200px',
            'height': '50px',
            'left': '80px',
            'top': '400px',
            'z-index': 0,
            'animation-name': 'none',
            'animation-duration': '1s',
            'animation-delay': '0s',
            'opacity': 1
        }
    }
};








list.pic = {
    author: 'roeis',
    name: '图片',
    pic: 'http://i2.w.hjfile.cn/news/201503/201503302231831210.jpg',
    src: {
        id: 'm_0',
        type: 'default',
        extra: {
            link: '',
            audio: '',
            video: '',
            analyze: '',
            jump: ''
        },
        child: {
            innerHtml: '',
            style: {
                'background-image': 'url(http://i2.w.hjfile.cn/news/201503/201503302231831210.jpg)',
                'background-color': 'rgba(255,255,255,1)',
                'background-size': '100% auto',
                'color': '#333',
                'font-size': '14px',
                'text-align': 'center',
                'vertical-align': 'middle',
                'border-radius': '0',
                'padding': 0,
                'transform': 'rotate(0deg)'
            },
        },
        style: {
            'width': '200px',
            'height': '200px',
            'left': '80px',
            'top': '100px',
            'z-index': 0,
            'animation-name': 'none',
            'animation-duration': '1s',
            'animation-delay': '0s',
            'opacity': 1
        }
    }
};









list.audio = {
    author: 'roeis',
    name: '音频',
    pic: 'http://i2.w.hjfile.cn/news/201503/201503302233840644.jpg',
    src: {
        id: 'm_0',
        type: 'video',
        extra: {
            link: '',
            audio: 'http://www.w3school.com.cn/i/movie.ogg',
            video: '',
            analyze: '',
            jump: ''
        },
        child: {
            innerHtml: '<p>play</p>',
            style: {
                'background-image': 'none',
                'background-color': 'rgba(27,181,44,1)',
                'background-size': '100% auto',
                'color': '#fff',
                'font-size': '24px',
                'text-align': 'center',
                'vertical-align': 'middle',
                'border-radius': '5px',
                'padding': 0,
                'transform': 'rotate(0deg)'
            },
        },
        style: {
            'width': '100px',
            'height': '50px',
            'left': '140px',
            'top': '150px',
            'z-index': 0,
            'animation-name': 'none',
            'animation-duration': '1s',
            'animation-delay': '0s',
            'opacity': 1
        }
    }
};








list.video = {
    author: 'roeis',
    name: '视频',
    pic: 'http://i2.w.hjfile.cn/news/201503/201503302272062291.jpg',
    src: {
        id: 'm_0',
        type: 'video',
        extra: {
            link: '',
            audio: '',
            video: 'http://www.w3school.com.cn/i/movie.ogg',
            analyze: '',
            jump: ''
        },
        child: {
            innerHtml: '<p>video Example</p>',
            style: {
                'background-image': 'none',
                'background-color': 'rgba(255,255,255,1)',
                'background-size': '100% auto',
                'color': '#333',
                'font-size': '24px',
                'text-align': 'center',
                'vertical-align': 'middle',
                'border-radius': '5px',
                'padding': 0,
                'transform': 'rotate(0deg)'
            },
        },
        style: {
            'width': '300px',
            'height': '200px',
            'left': '30px',
            'top': '40px',
            'z-index': 0,
            'animation-name': 'none',
            'animation-duration': '1s',
            'animation-delay': '0s',
            'opacity': 1
        }
    }
};







list.jump = {
    author: 'roeis',
    name: '跳转',
    pic: 'http://i2.w.hjfile.cn/news/201506/201506101164650169.jpg',
    src: {
        id: 'm_0',
        type: 'jump',
        extra: {
            link: '',
            audio: '',
            video: '',
            analyze: '',
            jump: 1
        },
        child: {
            innerHtml: '<p>查看答案</p>',
            style: {
                'background-image': 'none',
                'background-color': 'rgba(27,181,44,1)',
                'background-size': '100% auto',
                'color': '#fff',
                'font-size': '18px',
                'text-align': 'center',
                'vertical-align': 'middle',
                'border-radius': '30px',
                'padding': 0,
                'transform': 'rotate(0deg)'
            },
        },
        style: {
            'width': '140px',
            'height': '50px',
            'left': '180px',
            'top': '460px',
            'z-index': 0,
            'animation-name': 'none',
            'animation-duration': '1s',
            'animation-delay': '0s',
            'opacity': 1
        }
    }
};







list.qq = {
    author: 'roeis',
    name: 'QQ链接',
    pic: 'http://i2.w.hjfile.cn/news/201506/201506263441245184.jpg',
    src: {
        id: 'm_0',
        type: 'link',
        extra: {
            link: '',
            audio: '',
            video: '',
            analyze: '',
            jump: 1
        },
        child: {
            innerHtml: '<p>点击进入QQ群</p>',
            style: {
                'background-image': 'none',
                'background-color': 'rgba(44,84,202,1)',
                'background-size': '100% auto',
                'color': '#fff',
                'font-size': '18px',
                'text-align': 'center',
                'vertical-align': 'middle',
                'border-radius': '30px',
                'padding': 0,
                'transform': 'rotate(0deg)'
            },
        },
        style: {
            'width': '300px',
            'height': '60px',
            'left': '30px',
            'top': '460px',
            'z-index': 0,
            'animation-name': 'none',
            'animation-duration': '1s',
            'animation-delay': '0s',
            'opacity': 1
        }
    }
};
