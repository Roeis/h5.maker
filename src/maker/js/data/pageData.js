'use strict';
/**
 list           : 元数据， 直接操作舞台上的属性
 listHtml       : 生成数据，用于前台页面
 config         : 配置，模板的属性
 global         : 全局属性
 */
var data = {
    list: [
        {
            elements: [
                    {
                        id: 'm_0',
                        type: 'btn',
                        innerHtml: '',
                        extra: {
                            link: 'template link',
                            audio: '',
                            video: '',
                            analyze: ''
                        },
                        childStyle: {
                            'transform': 'rotate(0deg)',
                            'text-align': 'center',
                            'vertical-align': 'center',
                            'font-size': '15px',
                            'background-image': 'none',
                            'background-color': '#f50',
                            'border-radius': '0px'
                        },
                        style: {
                            'left': 0,
                            'top': '200px',
                            'width': '360px',
                            'height': '100px',
                            'z-index': 0,
                            'animation-name': 'none',
                            'animation-duration': '1s',
                            'animation-delay': '1s',
                            'opacity': 1
                        }
                    },
                    {
                        id: 'm_1',
                        type: 'btn',
                        innerHtml: '<p>testtsst sfds</p>',
                        extra: {
                            link: 'template link',
                            audio: 'audio link',
                            video: 'video link',
                            analyze: 'analyze link'
                        },
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
                            'left': 0,
                            'top': 0,
                            'width': '360px',
                            'height': '100px',
                            'z-index': 0,
                            'animation-name': 'none',
                            'animation-duration': '1s',
                            'animation-delay': '1s',
                            'opacity': 1
                        }
                    },
                    {
                        id: 'm_2',
                        type: 'btn',
                        innerHtml: '<p>testtsst sfds</p>',
                        childStyle: {
                            'transform': 'rotate(80deg)',
                            'text-align': 'left',
                            'vertical-align': 'top',
                            'font-size': '15px',
                            'border-radius': '10px',
                            'background-color': '#fff',
                            'background-image': 'url(http://www.hujiang.com/2010/images/default2015/logo.png)'
                        },
                        style: {
                            'left': '200px',
                            'top': '250px',
                            'width': '100px',
                            'height': '100px',
                            'z-index': 0,
                            'animation-name': 'none',
                            'animation-duration': '1s',
                            'animation-delay': '1s',
                            'opacity': 1
                        }
                    }
                ],
            style: {
                'background': 'url("http://jsdf.com/sdf.jpg")',
                'backgounnd-color': '#fff'
            }
        },
        {
            elements: [
                    {
                        id: 'm_3',
                        type: 'btn',
                        innerHtml: '<div class="inner"></div>',
                        childStyle: {
                            'transform': 'rotate(45deg)',
                            'text-align': 'center',
                            'font-size': '15px',
                            'color': '#fff',
                            'background-color': '#fff',
                        },
                        style: {
                            left: 0,
                            top: 0,
                            width: '50px',
                            height: '50px',
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
        },
        {
            elements: [
                    {
                        id: 'm_4',
                        type: 'btn',
                        innerHtml: '<div class="inner"></div>',
                        childStyle: {
                            'transform': 'rotate(45deg)',
                            'text-align': 'center',
                            'font-size': '15px',
                            'color': '#fff',
                            'background-color': '#fff',
                        },
                        style: {
                            left: 0,
                            top: 0,
                            width: '50px',
                            height: '50px',
                            'animation-name': 'tada',
                            'animation-duration': '1s',
                            'animation-delay': '0s'
                        }
                    }
                ],
            style: {
                'background': 'url("http://jsdf.com/sdf.jpg")',
                'backgounnd-color': '#fff'
            }
        },
    ],
    // generate by render function
    listHtml: [],
    config: {
        isLoop: false,
        direction: 'vertical',
    },
    global: {
        music: '',
        style: '',
        count: 6,
        template: 1
    }

};

module.exports = data;