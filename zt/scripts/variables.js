(function(global, undefined) {
    'use strict';
    var KEY = {
            INSERT: 45,
            DELETE: 46,
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            END: 35,
            HOME: 36,
            SPACEBAR: 32,
            PAGEUP: 33,
            PAGEDOWN: 34,
            F2: 113,
            F10: 121,
            F12: 123,
            NUMPAD_PLUS: 107,
            NUMPAD_MINUS: 109,
            NUMPAD_DOT: 110
        },

        URL = {
            ST: 'http://api2.site.hujiang.com/SheTuan/SheTuan.ashx'
        },

        para = {
            st: {
                op: 'GetPostListByTopicID',
                topicid: 163068829881,
                page: 1,
                pageSize: 50
            }
        },

        htmlSnippet = {
            'blankPage': '<div class="page" data-type="0"><div class="m_cont"></div></div>',
            'arrowBtn': [{
                cls: 'func func_up',
                prev: '<span class="glyphicon glyphicon-menu-up"></span>',
                next: '<span class="glyphicon glyphicon-menu-down"></span>'
            }, {
                cls: 'func func_left cf',
                prev: '<span class="glyphicon glyphicon-menu-left"></span>',
                next: '<span class="glyphicon glyphicon-menu-right"></span>'
            }],

        },

        //动画名称及中文对应名
        animaName = {
            "none": {
                cn: "无效果",
                opacity: 1
            },
            "flash": {
                cn: "闪烁",
                opacity: 0
            },
            "shake": {
                cn: "抖动",
                opacity: 0
            },
            "tada": {
                cn: "嗒哒",
                opacity: 0
            },
            "swing": {
                cn: "吊牌",
                opacity: 0
            },
            "wobble": {
                cn: "摇一摇",
                opacity: 0
            },
            "pulse": {
                cn: "放大",
                opacity: 0
            },
            "flip": {
                cn: "翻转",
                opacity: 0
            },
            "flipInX": {
                cn: "X轴翻转",
                opacity: 0
            },
            "flipInY": {
                cn: "Y轴翻转",
                opacity: 0
            },
            "fadeIn": {
                cn: "渐入",
                opacity: 0
            },
            "fadeInUp": {
                cn: "从下<br>渐入",
                opacity: 0
            },
            "fadeInDown": {
                cn: "从上<br>渐入",
                opacity: 0
            },
            "fadeInLeft": {
                cn: "从左<br>渐入",
                opacity: 0
            },
            "fadeInRight": {
                cn: "从右<br>渐入",
                opacity: 0
            },
            "fadeInUpBig": {
                cn: "从下<br>大渐入",
                opacity: 0
            },
            "fadeInDownBig": {
                cn: "从上<br>大渐入",
                opacity: 0
            },
            "fadeInLeftBig": {
                cn: "从左<br>大渐入",
                opacity: 0
            },
            "fadeInRightBig": {
                cn: "从右<br>大渐入",
                opacity: 0
            },
            'zoomIn': {
                cn: '放大入',
                opacity: 0
            },
            'zoomInDown': {
                cn: '从上<br>放大入',
                opacity: 0
            },
            'zoomInLeft': {
                cn: '从左<br>放大入',
                opacity: 0
            },
            'zoomInRight': {
                cn: '从右<br>放大入',
                opacity: 0
            },
            'zoomInUp': {
                cn: '从下<br>放大入',
                opacity: 0
            },
            "bounceIn": {
                cn: "䶮入",
                opacity: 0
            },
            "bounceInUp": {
                cn: "从下<br>䶮入",
                opacity: 0
            },
            "bounceInDown": {
                cn: "从上<br>䶮入",
                opacity: 0
            },
            "bounceInLeft": {
                cn: "从左<br>䶮入",
                opacity: 0
            },
            "bounceInRight": {
                cn: "从右<br>䶮入",
                opacity: 0
            },
            "rotateIn": {
                cn: "转入",
                opacity: 0
            },
            "rotateInUpLeft": {
                cn: "向左上<br>转入",
                opacity: 0
            },
            "rotateInDownLeft": {
                cn: "向左下<br>转入",
                opacity: 0
            },
            "rotateInUpRight": {
                cn: "向右上<br>转入",
                opacity: 0
            },
            "rotateInDownRight": {
                cn: "向右下<br>转入",
                opacity: 0
            },
            "rollInRight": {
                cn: "从左旋转入",
                opacity: 0
            },
            "rollInLeft": {
                cn: "从右旋转入",
                opacity: 0
            },
            "lightSpeedInLeft": {
                cn: "从右变形入",
                opacity: 0
            },
            "lightSpeedInRight": {
                cn: "从左变形入",
                opacity: 0
            },
            "fadeOut": {
                cn: "淡出",
                opacity: 1
            }
        };

    global.KEY = KEY;
    global.URL = URL;
    global.para = para;
    global.animaName = animaName;

})(this);