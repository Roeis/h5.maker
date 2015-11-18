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
                        value: '',
                        childStyle: {
                            'transform': 'rotate(45deg)',
                            'text-align': 'center',
                            'vertical-align': 'center',
                            'font-size': '15px',
                            'background-image': 'url(https://www.npmjs.com/static/images/wombat-avatar-small.png)',
                            'background-color': '#fff',
                            'border-radius': '30px'
                        },
                        style: {
                            left: 0,
                            top: 0,
                            width: '50px',
                            height: '50px',
                            animation: 'wobble 1s ease 1s forwards',
                        }
                    },
                    {
                        id: 'm_1',
                        type: 'btn',
                        value: '<p>testtsst sfds</p>',
                        childStyle: {
                            'transform': 'rotate(45deg)',
                            'text-align': 'center',
                            'vertical-align': 'middle',
                            'font-size': '15px',
                            'background-color': '#fff',
                            'background-image': 'url(http://www.hujiang.com/2010/images/default2015/logo.png)'
                        },
                        style: {
                            left: 0,
                            top: 0,
                            width: '100px',
                            height: '100px',
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
                        value: '<div class="inner"></div>',
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
                            animation: 'wobble 1s ease 1s forwards'
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
                        value: '<div class="inner"></div>',
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
                            animation: 'wobble 1s ease 1s forwards'
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
                        id: 'm_5',
                        type: 'btn',
                        value: '<div class="inner"></div>',
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
                            animation: 'wobble 1s ease 1s forwards'
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