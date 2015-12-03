'use strict';
/**
 * list           : 元数据， 直接操作舞台上的属性
 * listHtml       : 生成数据，用于前台页面
 * config         : 配置，模板的属性
 * global         : 全局属性
 */
var data = {
    list: [
        {
            elements: [
                    {
                        id: 'm_0',
                        type: 'audio',
                        extra: {
                            link: 'template link 1',
                            audio: 'audio link 1',
                            video: '',
                            analyze: 'analyze 1',
                            jump: ''
                        },
                        child: {
                            innerHtml: '<div class="test"></div>',
                            style: {
                                'transform': 'rotate(0deg)',
                                'text-align': 'center',
                                'vertical-align': 'center',
                                'font-size': '15px',
                                'color': '#333',
                                'background-image': 'none',
                                'background-color': '#f50',
                                'background-size': '100% auto',
                                'border-radius': '0px',
                                'padding': 0
                            }
                        },
                        style: {
                            'left': '10px',
                            'top': '200px',
                            'width': '320px',
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
                        type: 'link',
                        extra: {
                            link: 'template link 2',
                            audio: 'audio link',
                            video: 'video link',
                            analyze: 'analyze link 2'
                        },
                        child: {
                            innerHtml: '<p>testtsst sfds</p>',
                            style: {
                                'transform': 'rotate(0deg)',
                                'text-align': 'center',
                                'vertical-align': 'middle',
                                'font-size': '15px',
                                'color': '#f50',
                                'border-radius': '0px',
                                'background-color': '#fff',
                                'background-image': 'none',
                                'background-size': '100% auto',
                                'padding': 0
                            }
                        },
                        style: {
                            'left': '20px',
                            'top': 0,
                            'width': '320px',
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
                        type: 'default',
                        extra: {
                            link: 'template link 3',
                            audio: 'audio link',
                            video: 'video link',
                            analyze: 'analyze link 23'
                        },
                        child: {
                            innerHtml: '<p>testtsst sfds</p>',
                            style: {
                                'transform': 'rotate(0deg)',
                                'text-align': 'left',
                                'vertical-align': 'top',
                                'font-size': '15px',
                                'color': '#333',
                                'border-radius': '10px',
                                'padding': 0,
                                'background-color': '#fff',
                                'background-size': 'auto 100%',
                                'background-image': 'url(http://www.hujiang.com/2010/images/default2015/logo.png)'
                            }
                        },
                        style: {
                            'left': '30px',
                            'top': '400px',
                            'width': '200px',
                            'height': '50px',
                            'z-index': 0,
                            'animation-name': 'none',
                            'animation-duration': '1s',
                            'animation-delay': '1s',
                            'opacity': 1
                        }
                    }
                ],
            style: {
                'background-image': 'url(http://i2.w.hjfile.cn/news/201503/201503263340041851.jpg)',
                'background-color': '#fff',
                'background-size': 'auto 100%'
            }
        }
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
        template: 1,
        style: ''
    }

};

module.exports = data;
