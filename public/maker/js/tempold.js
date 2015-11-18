/**
 * 模板系统
 * 暂时采用jq开发，angular第一次尝试失败，时间上比较紧迫, 上手难度和排期都有问题
 * 先实现，后更换框架
 */

(function (global, $) {
    'use strict';

    var _ = global._,
        UE = global.UE;

    // CKEDITOR.disableAutoInline = true;
    // 实例化编辑器
    var uedit = UE.getEditor('ueditor', {
        toolbars: [
            ['source', 'fullscreen', '|', 'undo', 'redo', 'removeformat', 'formatmatch', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'lineheight', 'forecolor', 'backcolor', 'fontsize', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',  'link', 'unlink', 'simpleupload',],
        ],
        wordCount: false,
        //关闭elementPath
        elementPathEnabled: false,
        // isShow: false,
        //默认的编辑区域高度
        initialFrameWidth: 720,
        initialFrameHeight: 400,
        autoHeightEnabled: false,
        autotypeset: {
             removeClass: false, //去掉冗余的class
        },
        //取消Div标签转换成P标签
        allowDivTransToP: false
    });

    // 缓存jquery对象
    var $doc = $(document),
        $device = $('#device'),
        $output = $('#output'),
        $viewbox = $('#viewbox'),
        $panelTemplate = $('#panel_template'),
        $contextMenu = $('#contextMenu'),
        $bkEditCont = $('#bk_edit_cont'),
        $pageCount = $('#pageCount'),

        $funcbtns = $('#funcbtns'),
        $btnPrev = $('#btn_prev'),
        $btnNext = $('#btn_next'),
        $bglayer = $('#bglayer'),

        $btnSave = $('#btn_save'),

        // $numCurPage = $('#num_curPage'),
        // $numPageLenth = $('#num_pageLength'),
        // $editTarget = $('#edit_target'),

        $uedit = $('#ueditor'),

        $ui_height = $('#ui_for_height'),
        $val_height = $('#css_height'),

        $ui_width = $('#ui_for_width'),
        $val_width = $('#css_width'),

        $ui_animaDura = $('#ui_for_duration'),
        $val_animaDura = $('#css_animaDuartion'),

        $ui_animaDelay = $('#ui_for_delay'),
        $val_animaDelay = $('#css_animaDelay'),

        $ui_radius = $('#ui_for_radius'),
        $val_radius = $('#css_radius'),

        $ui_padding = $('#ui_for_padding'),
        $val_padding = $('#css_padding'),

        $css_zIndex = $('#css_zIndex'),

        // $ui_lh = $('#ui_for_lineHeight'),
        // $val_lh = $('#css_lineHeight'),

        $css_bgcolor = $('#css_bgcolor'),
        $css_color = $('#css_color'),
        $cssBgImage = $('#css_bgImage'),

        // $cssMartop = $('#css_mar_top'),
        // $cssMarRight = $('#css_mar_right'),
        // $cssMarBottom = $('#css_mar_bottom'),
        // $cssMarLeft = $('#css_mar_left'),

        // $cssPadtop = $('#css_pad_top'),
        // $cssPadRight = $('#css_pad_right'),
        // $cssPadBottom = $('#css_pad_bottom'),
        // $cssPadLeft = $('#css_pad_left'),

        $cssLeft = $('#css_left'),
        $cssTop = $('#css_top'),


        $vertAlign = $('#opts_vertAlign'),
        $horiAlign = $('#opts_horiAlign'),

        $htmlAnima = $('#htmlAnimaName'),

        $tabCss = $('#tab_a_css'),
        $tabAnima = $('#tab_a_anima'),

        $pageTmpl = $('#page_templates'),
        $otherTmpl = $('#other_templates'),
        $apiTmpl = $('#api_templates'),
        $logoTmpl = $('#logo_templates'),
        $weixinTmpl = $('#weixin_templates'),

        $copy = null,
        //log the current object
        $curEdit = null;


    var htmlBtn = [{
            cls: 'func func_up',
            prev: '<span class="glyphicon glyphicon-menu-up"></span>',
            next: '<span class="glyphicon glyphicon-menu-down"></span>'
        }, {
            cls: 'func func_left cf',
            prev: '<span class="glyphicon glyphicon-menu-left"></span>',
            next: '<span class="glyphicon glyphicon-menu-right"></span>'
        }];

    // log page's data
    var html_blankpage = '<div class="page" data-type="0"><div class="m_cont"></div></div>',
        pageData = [{
            html: '<div class="page" data-type="0" style="color: rgb(51, 51, 51); background-color: rgba(0, 0, 0, 0);">'+
                        '<div class="m_cont">'+
                            '<div class="item_edit item_drag" data-type="2" style="position: absolute; left: 19%; top: 18%; width: 62%; height: 29%; z-index: auto; background-image: url(http://i2.w.hjfile.cn/news/201503/201503255395989388.png); background-size: 100%; background-repeat: no-repeat;">'+
                                '<div class="m_elem"></div>'+
                            '</div>'+
                            '<div class="item_edit item_drag item_text" data-type="1" style="position: absolute; left: 11%; top: 56%; width: 80%; height: 16%; z-index: auto;">'+
                                '<div class="m_elem" style="padding: 10px; vertical-align: middle; text-align: center;">'+
                                    '<p style="font-size: 20px;"><span style="font-size: 24px;">欢迎来到专题梦工厂</span>'+
                                    '</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="item_edit item_drag item_text" data-type="1" style="position: absolute; left: 11%; top: 74%; width: 80%; height: 10%; z-index: auto;">'+
                                '<div class="m_elem" style="padding: 10px; vertical-align: middle; text-align: center;">'+
                                    '<p>沪江H5专题制作神器</p>'+
                                    '<p>门户组制造</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
        }],

        pageInfo = {
            index: 0, //当前页面index
            direction: 0 //0: 上下, 1: 左右
        },

        screenWidth = 360,
        screenHeight = 540,

        pageDBopType = 'ADD',

        pageID = 0,

        isSaving = false,
        
        tmplData = null,
        logoData = null,
        apiData = null,
        otherData = null,
        weixinData = null,

        URL = {
            ST: 'http://api2.site.hujiang.com/SheTuan/SheTuan.ashx'
        },
        para = {
            st: {
                op: 'GetPostListByTopicID',
                topicid: 163068829881,
                page:1,
                pageSize: 50
            }
        };

        //mobile variables
    var _page = mu.widget.pagetrans,
        swipeOption = [{
            'inclass': {
                1: 'pt-moveFromBottom',
                2: 'pt-moveFromTop'
            },
            'ouclass': {
                1: 'pt-moveToTop',
                2: 'pt-moveToBottom'
            }
        }, {
            'inclass': {
                1: 'pt-moveFromRightFade',
                2: 'pt-moveFromLeftFade'
            },
            'ouclass': {
                1: 'pt-moveToLeftFade',
                2: 'pt-moveToRightFade'
            }
        }],
        _page_option = {
            //页面跳转前回调
            beforePageTrans: function ($oupage, $inpage) {
                //BUG: transition，样式依旧改为visibility, 而非display去触发animation
                $inpage.find('.m_cont').show();
            },
            //页面跳转后回调
            afterPageTrans: function ($oupage, $inpage, current) {
                $oupage.find('.m_cont').hide();

                _page_option.pageStart = pageInfo.index = current;

                core._initUiStatus();

                $viewbox.trigger('click');

            },
            /** 转场class对象 */
            cls: swipeOption[0],
            /** 是否循环 */
            loop: true,
            /** 指定开始页面 */
            pageStart: 0
        },

        // 样式列表，一些需要读取的样式属性
        listCssKey = {
            0: 'background-color',
            1: 'background-image',
            2: 'color',
            3: 'width',
            4: 'height',
            5: 'top',
            6: 'right',
            7: 'bottom',
            8: 'left',
            9: 'vertical-align',
            10: 'animation-name',
            11: 'animation-duration',
            12: 'animation-delay',
            13: 'animation',
            14: '',
            15: '',
            16: '',
            17: 'z-index',
            18: '',
            19: '',
            20: '',
            21: '',
            22: 'margin-left',
            23: 'margin-top',
            24: 'margin-right',
            25: 'margin-bottom',
            26: 'border-radius',
            27: 'padding',
            28: 'text-align'
        },

        // 样式编辑框的对应divID
        listInputBlock = {
            0: '#input_bgcolor',
            1: '#input_color',
            2: '#input_bgimg',
            3: '#input_height',
            4: '#input_width',
            5: '#input_postion',
            6: '#input_lineHeight',
            7: '#input_global',
            8: '#input_vertical',
            9: '#input_borderRadius',
            10: '#input_zIndex',
            11: '#input_padding',
            12: '#input_audio',
            13: '#input_video',
            14: '#input_margin',
            15: '#input_href',
            16: '#input_analyze',
            17: '#input_horizontal',
            18: '#input_arrow',
            19: '#input_st_reply',
            20: '#input_wx_coupon',
            21: '#input_jump',
            22: '#input_vote',
        },



        // 新想法: 注册固定格式模块 how to inject a new plugin
        //         如何快速注入一个新模块
        // 比如：挂一个对象['模块名']
        // 模块名 = {
        //      name: '',
        //      idx: 23,
        //      beforeAction: function(){
        //          
        //      },
        //      afterAction: function(){
        //          
        //      },
        //      adapt: function(){
        //          
        //      }
        //  }
        //  
        // 当前对象['模块名'].function
        // 
        // 保存方案
        //     操作指定步骤后，保存页面至localStorage，单个页面存储
        //     撤销操作和重做，即恢复某一节点的数据
        //     但是localstorage的容量有限。
        //     
        //     或者可以, 记在一个数组中或缓存变量中
        //     
        // 保存模板方案
        //     操作右键新增操作按钮, 保存为自定义模板
        //     取得当前页面存到本地localstorage中
        //     
        //     
        // 值得推进的公共组件
        //     上传图片
        //     上传音频
        //     
        // 旋转功能的实现。需要在当前的html结构基础上，添加额外结构专门用来保存transform的rotate属性
        // 注：可以再下一大版本中调整
        // 

        // data-type对应关系，添加数字来开关显示模块
        // eg: <div class="item_edit item_drag" data-type="2"></div>
        //     data-type=2 表示 在对应cssPattern的组合【2】中读取这些样式属性 编号是listCssKey
        //     并且对应在blockPatern的组合【2】中打开对应的样式编辑框 编号是listInputBlock
        //     
        //0: page页面
        //1: 
        //2: 绝对元素 item_drag
        //3: wrapper
        //4: descrepted
        //5: 拖动音频
        //6: 拖动按钮,链接
        //7: 拖动视频
        //7: 特定元素
        //21: 社团评论
        //22: 优惠券
        //23: 投票
        //30: 跳转按钮
        cssPattern = {
            0: [0, 1, 2],
            1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 17, 26],
            2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 17, 26],
            3: [0, 1, 2],
            4: [],
            5: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 17, 26],
            6: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 17, 26],
            7: [3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 17],
            8: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 17, 28],
            11: [0, 1, 2, 3, 4, 5, 6, 7, 8, 17],
            21: [],
            22: [3, 4, 5, 6, 7, 8, 17],
            23: [],
            30: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 17, 26]
        },

        blockPattern = {
            0: [0, 1, 2],
            1: [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 17],
            2: [0, 1, 2, 3, 4, 5, 9, 10, 11],
            3: [0, 1, 2, 7],
            4: [],
            5: [0, 1, 2, 3, 4, 5, 9, 10, 12],
            6: [0, 1, 2, 3, 4, 5, 9, 10, 15, 16],
            7: [3, 4, 5, 13, 10],
            8: [0, 1, 2, 3, 4, 5, 10, 17],
            11: [0, 1, 2, 3, 4, 5, 10, 18],
            21: [19],
            22: [3, 4, 5, 10, 20],
            23: [22],
            30: [0, 1, 2, 3, 4, 5, 9, 10, 21]
        };

    var pCateId = $("#pCateId").val(),
        mQrcode = $('#mQrcode').val(),
        canEdit = $('#canEdit').val();

    //the core object
    var core = {

        //初始化内容页数据
        init: function () {

            this.getPageDataFromService();
        },

        //取得内容页后操作
        initAfterPageLoad: function () {

            this.getTemplate();

            this._initUi();

            this._bindEditEvent();

            this._initPage();

            this._warning();
        },

        //warning old version chrome
        _warning: function(){
            var app = window.navigator.appVersion.toLowerCase(),
                version = app.match(/chrome\/([\d.]+)/),
                isChrome = /chrome/i.test(app);

            version && (version = parseInt(version[1].slice(0, 2)));

            version <= 36 && alert('厂长建议你使用新版Chrome~');
            !isChrome && alert('请使用chrome来体验这款神器~');
        },

        //初始化UI组件
        //include: 百度编辑窗，颜色选取，本地颜色选取，tooltip提示
        _initUi: function() {


            // $uedit.draggable({
            //     containment: 'body',
            //     handle: '.bk_tab_head'
            // });

            $css_color.minicolors({
                theme: 'bootstrap',
                change: function(hex) {
                    $curEdit.css('color', hex);
                }
            });

            $css_bgcolor.minicolors({
                control: 'hue',
                theme: 'bootstrap',
                opacity: true,
                change: function(hex, opacity) {
                    var rgba = $css_bgcolor.minicolors('rgbaString');
                    $curEdit.css('background-color', rgba);
                }
            });

            $('[title]').tooltip({
                position: {
                    my: "left bottom",
                    at: "left top",
                },
            });

            this._initSlider();

            this._initCustomColorPick();

            this._initHtmlAnima();

            this._tabPanel();

            this._initQrcode();

            this._initLocalStatus();
        },
        // 辅助线 功能
        _initLocalStatus: function(){
            var $line = $('#assistLine'),
                flag, hasLine = localStorage.isUseLine;
            if(!hasLine){
                localStorage.isUseLine = 'false';
            }else{
                if(hasLine === 'true'){
                    $output.addClass('hasLine');
                    flag = true;
                }else{
                    flag = false;
                }
                $line.attr('checked', flag);
            }
        },

        // 滑动组件中包含了绑定样式
        _initSlider: function() {

            $ui_height.slider({
                min: 0,
                max: 100,
                slide: function(event, ui) {
                    $val_height.val(ui.value);
                    $curEdit.css('height', ui.value + '%');
                }
            });

            $ui_width.slider({
                min: 0,
                max: 100,
                slide: function(event, ui) {
                    $val_width.val(ui.value);
                    $curEdit.css('width', ui.value + '%');
                }
            });

            $ui_animaDura.slider({
                min: 0,
                max: 5.1,
                step: 0.1,
                slide: function(event, ui) {
                    $val_animaDura.val(ui.value);
                    if($curEdit.hasClass('page')) return;
                    $curEdit.css({
                        'animation-duration': ui.value + 's'
                    });
                }
            });

            $ui_animaDelay.slider({
                min: 0,
                max: 10.1,
                step: 0.1,
                slide: function(event, ui) {
                    $val_animaDelay.val(ui.value);
                    if($curEdit.hasClass('page')) return;
                    $curEdit.css({
                        'animation-delay': ui.value + 's'
                    });
                }
            });

            $ui_radius.slider({
                min: 0,
                max: 200,
                slide: function(event, ui) {
                    $val_radius.val(ui.value);
                    $curEdit.css('border-radius', ui.value + 'px');
                }
            });

            $ui_padding.slider({
                min: 0,
                max: 100,
                slide: function(event, ui){
                    $val_padding.val(ui.value);
                    $curEdit.find('.m_elem').css('padding', ui.value + 'px');
                }
            });
        },

        //本地颜色选取模块, 可添加自定义颜色
        _initCustomColorPick: function() {
            var colorArr = [
                    "#00145e", "#150241", "#340147", "#430b1f", "#6e0600", "#661f00", "#653a00", "#644700", "#797600", "#2a4913", "#002e99", "#200162", "#4d0168", "#650f2f", "#a40900", "#9a2c01", "#975600", "#946a00", "#b6b200", "#3e6a1e", "#0044ff", "#3a01a3", "#8601ad", "#a8194a", "#ff2811", "#fe5409", "#fc9b00", "#fbbe00", "#ffff33", "#66b231", "#2e70fd", "#4901e4", "#af01f1", "#dd2168", "#fd4b3f", "#fd7137", "#fca730", "#fdc331", "#fffa59", "#85cd4c", "#6392ff", "#722dfd", "#c534fe", "#e5588d", "#fe776e", "#fd9468", "#febb63", "#fed264", "#fefb83", "#a3da78", "#98b7fe", "#a073fd", "#da78fe", "#ef90b3", "#ffa69f", "#feb79a", "#fdd298", "#fde197", "#fffeab", "#c2e5a6", "#cadcfd", "#d0bcfe", "#edbbff", "#f5c8d8", "#fed2ce", "#fedccc", "#ffeacc", "#fff1ca", "#fefed7", "#d8ebc9", "#2dc246"
                ],
                colorHtml = '<div class="blackwhitearea">' +
                '<div class="colorblock" style="background:rgb(255,255,255)"></div>' +
                '<div class="colorblock" style="background:rgb(227,227,227)"></div>' +
                '<div class="colorblock" style="background:rgb(199,199,199)"></div>' +
                '<div class="colorblock" style="background:rgb(170,170,170)"></div>' +
                '<div class="colorblock" style="background:rgb(142,142,142)"></div>' +
                '<div class="colorblock" style="background:rgb(114,114,114)"></div>' +
                '<div class="colorblock" style="background:rgb(85,85,85)"></div>' +
                '<div class="colorblock" style="background:rgb(57,57,57)"></div>' +
                '<div class="colorblock" style="background:black"></div>' +
                '<div class="colorblock nocolor" style="background:rgba(0,0,0,0)" ></div>' +
                '</div>';

            $('.colorPicker').each(function() {
                var $this = $(this),
                    $target = $this.find('.colorboard'),
                    html = '';

                for (var i = 0; i < colorArr.length; i++) {
                    html += '<div class="colorblock" style="background:' + colorArr[i] + '"></div>';
                }

                html += colorHtml;
                $target.html(html);
            });

            $doc.on('click', '.btn_colorPick', function() {
                var $this = $(this),
                    $target = $this.parent().find('.colorboard');
                $('.colorboard').hide();

                $target.show();
            });

            $doc.on('click', function(event) {
                var $this = $(event.target),
                    isColorPick = $this.parents('.colorPicker').length > 0;
                // isColorBordShow = $('.colorboard').is(":visible");
                if (!isColorPick) {
                    $('.colorboard').hide();
                }
            });

            $doc.on('click', '.colorblock', function() {
                var $this = $(this),
                    id = $this.closest('.input_block').attr('id'),
                    bgc = $this.css('background-color');
                if (id === 'input_bgcolor') {
                    $css_bgcolor.minicolors('value', core._rgb2hex(bgc).hex);
                    $css_bgcolor.minicolors('opacity', core._rgb2hex(bgc).opacity);
                } else if (id === 'input_color') {
                    $css_color.minicolors('value', core._rgb2hex(bgc).hex);
                }
            });

        },
        // 动画设置编辑
        _initHtmlAnima: function() {
            var elem, html = '';
            for (elem in animaName){
                html += '<div class="anime anime_' + elem + '" data-opacity="'+ animaName[elem].opacity +'" data-anima="' + elem + '" title="' + animaName[elem].cn + '">'+
                            '<div class="' + elem + '">' + animaName[elem].cn + '</div>'+
                        '</div>';
            }
            // console.log(html);

            $htmlAnima.html(html);

            $doc.on('click', '#htmlAnimaName .anime', function() {
                var $this = $(this),
                    opacity = parseInt($this.data('opacity')),
                    anima = $this.data('anima');

                $this.addClass('active').siblings().removeClass('active');

                $curEdit.css({
                    'opacity': opacity,
                    'animation-name': anima
                });

                if(anima === 'none'){
                    $curEdit.css({
                        'animation-fill-mode': 'none',
                        'animation-duration': '0s'
                    });
                    $val_animaDura.val(0);
                    $ui_animaDura.slider('value', 0);
                }else{
                    $curEdit.css({
                        'animation-fill-mode': 'forwards',
                        'animation-duration': '1s'
                    });
                    $val_animaDura.val(1);
                    $ui_animaDura.slider('value', 1);
                }
            });

            $doc.on('mouseenter mouseleave', '#htmlAnimaName .anime', function(event){
                var $this = $(this),
                    $target = $this.find('div');
                if(event.type === 'mouseenter'){
                    $target.addClass('animated');
                }else{
                    $target.removeClass('animated');
                }
            });
        },

        _tabPanel: function() {
            //左边侧边菜单
            $doc
                .on('click', '#toolNav li', function(event) {
                    var $this = $(this),
                        index = $this.index();
                    $panelTemplate.find('.bk_tab_cont').eq(index).show().siblings().hide();
                    
                })
                .on('mouseenter', '.bk_tab_head .bk_tab_li', function(event) {
                    var $this = $(this),
                        $parent = $this.closest('.bk_tab_ui'),
                        index = $this.index();

                    $this.addClass('active').siblings().removeClass('active');
                    $parent.find('.bk_cont').eq(index).show().siblings().hide();
                });
        },

        _initQrcode: function() {

            $('#qrcode_pic').qrcode({
                text: mQrcode,
                width: 200,
                height: 200
            });

        },


        // 当前编辑对象, 编辑函数主体
        // $curEdit = null;
        // 
        // 右键
        //    |__编辑
        //    |__复制
        //    |__粘贴
        //    |__外观
        //    |__删除
        //    
        // 页面
        //    |__增加
        //    |__删除
        //    |__排序
        //    |__更新
        //    |__复制
        //    |__预览
        //    |__保存
        //    
        // 
        // 元素
        //    |__部分编辑
        //    |
        //    |__全部编辑
        //          |__背景，颜色，背景图
        //          |__宽度，高度，行高，外间距，内间距
        //          |__圆角，边
        //          |__层级，定位
        // 
        // 操作元素
        //    |__固定属性的编辑
        //    |__换大背景
        //    |__添加音乐
        //    |__添加点缀元素
        //    |__功能简单,组合多
        //    |__元素限定性
        //    |__添加静态模板
        //    |__旋转功能
        //    

        _bindEditEvent: function() {

            //右键事件
            $doc.on('contextmenu', '#output', function(event) {

                var $this = $(event.target),
                    offset, window_h, target_h;

                $this.trigger('click');

                $contextMenu.show().css({
                    'left': event.pageX - 20,
                    'top': event.pageY - 10
                });

                // handle when reach bottom
                target_h = $contextMenu.height();
                offset = target_h + $contextMenu.offset().top;
                window_h = $(window).height();
                if(offset >= window_h){
                    $contextMenu.css({
                        'top': window_h - target_h - 20
                    });
                }

                // 取消默认contextmenu
                return false;

            });

            //点击事件
            $doc.on('click', '#viewbox', function (event) {

                var $this = $(event.target),
                    $parent = $this.parents('.item_edit'),
                    isEditable = $parent.length > 0,
                    isCurrent = $this.hasClass('item_edit'),
                    pattern;

                $('.m_cur').removeClass('m_cur');

                //NOTE: 不记parent的话，右键会找不到item_edit元素
                if (isEditable || isCurrent) {
                    $parent = isCurrent ? $this : $parent;
                    $curEdit = $parent;
                } else {
                    $curEdit = $('#page' + pageInfo.index);
                }

                pattern = $curEdit.data('type');

                core._initContextMenu(pattern);

                if($curEdit.length > 0){

                    $curEdit.addClass('m_cur');

                    //初始化当前对象样式给编辑
                    core._initCssToEdit($curEdit);
                }

                $('.colorboard').hide();
                $contextMenu.hide();
                $panelTemplate.find('.bk_tab_cont').hide();
                event.stopPropagation();

            });

            $doc.on('click', function(){
                var $this = $(event.target),
                    isLeftBlock = $this.hasClass('left_side_block') || $this.hasClass('left_side_block2') || $this.parents('.left_side_block').length > 0 || $this.parents('.left_side_block2').length > 0;
                if($contextMenu.is(':visible')){
                    $contextMenu.hide();
                }
                if(!isLeftBlock){
                    $panelTemplate.find('.bk_tab_cont').hide();
                }
            });

            //右键弹窗hover, 改变窗口大小
            // $doc.on('click', '#panel_screenChange li', function() {
            //         var $this = $(this),
            //             cls = $this.data('size');
            //         $this.addClass('active').siblings().removeClass();
            //         $device.removeClass().addClass('device ' + cls);
            //     });

            //移动模式, 恢复到普通布局修复, 方法废弃

            //修复resizable问题, 方法废弃

            //右键选项的事件绑定
            $doc
                .on('click', '#menu_remove', function(event) {

                    $curEdit.remove();
                    // event.stopPropagation();
                })
                .on('click', '#menu_edit', function(event) {
                    $contextMenu.hide();
                    core.showUE($curEdit.find('.m_elem').html());
                    event.stopPropagation();
                })
                .on('click', '#menu_copy', function(event){
                    core._destroyUiStatus();

                    $copy = $curEdit.clone();

                    core._initUiStatus();
                })
                .on('click', '#menu_paste', function(event){
                    var html, left, top, middle, center;
                    if($copy){
                        // left = parseInt($copy.css('left')) + 1;
                        // top = parseInt($copy.css('top')) + 1;
                        // 
                        middle = parseInt($copy.width() / 2),
                        center = parseInt($copy.height() / 2),
                        // console.log(width);
                        left = parseInt((event.pageX - $output.offset().left) / screenWidth * 100);
                        top = parseInt((event.pageY - $output.offset().top) / screenHeight * 100);
                        // console.log(left);
                        
                        $copy.css({
                            left: left - middle + '%',
                            top: top - center + '%'
                        });
                        html = core.getOriginHtml($copy);

                        $('#page' + pageInfo.index).find('.m_cont').append(html);
                        core._initUiStatus();
                    }else{
                        alert('亲，先复制~');
                    }

                })
                .on('click', '#menu_zIndexUp', function(event){
                    core._zIndexChange($curEdit, 'up');
                    event.stopPropagation();
                })
                .on('click', '#menu_zIndexDown', function(event){
                    core._zIndexChange($curEdit, 'down');
                    event.stopPropagation();
                });

            //百度编辑器
            $doc
                .on('click', '#btn_cancelEdit, #bglayer', core.hideUE)
                .on('click', '#btn_saveEdit', core.saveEdit);

            $doc
                .on('click', '#btn_save', function(){
                    
                    if(isSaving){
                        alert('还在拼命保存中。。。');
                    }else{
                        $btnSave.removeClass().addClass('btn btn-default');
                        // 保存数据
                        core.UpdatePageDataToService("SAVE");
                    }

                })
                .on('click', '#btn_complete', function(){
                    // 完成编辑,提交数据
                    core.UpdatePageDataToService("OK");
                })
                .on('click', '#btn_setGlobal', function(){
                    $curEdit = $output.find('.wrapper');
                    core._initCssToEdit($curEdit);
                })
                .on('click', '#sourceCode', function() {
                    $curEdit = $output.find('.wrapper');
                    core._destroyUiStatus();
                    core.showUE($output.html());
                });

            $doc.on('keydown', function(event){
                var key = event.keyCode,
                    left = parseInt($cssLeft.val()),
                    top = parseInt($cssTop.val()),
                    isEditable =$curEdit.hasClass('item_drag');

                if(!isEditable) return;

                switch(key){
                    case KEY['LEFT']:
                        // if(left <= 0) return;
                        left --;
                        $cssLeft.val(left);
                        break;
                    case KEY['RIGHT']:
                        // if(left >= 100) return;
                        left ++;
                        $cssLeft.val(left);
                        break;
                    case KEY['UP']:
                        // if(top <= 0) return;
                        top --;
                        $cssTop.val(top);
                        break;
                    case KEY['DOWN']:
                        // if(top <= 100) return;
                        top ++;
                        $cssTop.val(top);
                        break;
                    default:
                        break;
                }
                $cssLeft.trigger('change');
                $cssTop.trigger('change');
            });

            $doc
                .on('change', '#assistLine', function(){
                    // var val = document.getElementById("assistLine").checked;
                    console.log(this.checked);
                    localStorage.isUseLine = this.checked;
                    if(this.checked){
                        $output.addClass('hasLine');
                    }else{
                        $output.removeClass('hasLine');
                    }

                })
                .on('click','.about_a', function(){
                    $('.about').show();
                })
                .on('click','.about', function(){
                    $('.about').hide();
                });
        },

        // 初始化右键menu
        _initContextMenu: function(pattern){
            switch(pattern){
                case 0: 
                    $contextMenu.find('li').hide().end().find('#menu_paste').show();
                    break;
                case 21:
                case 23:
                    $contextMenu.find('li').hide().end().find('#menu_remove').show();
                    break;
                case 22:
                    $contextMenu.find('li').show().end().find('#menu_edit').hide();
                    break;
                default:
                    $contextMenu.find('li').show();
                    break;
            }
        },

        //层级改变
        _zIndexChange: function($obj, direction){
            var val = $css_zIndex.val();

            if(direction === 'up'){
                val ++;
            }else{
                if(val <= 0){
                    alert('不能再下移了~');
                    return;
                }
                val --;
            }
            $obj.css('z-index', val);
            $css_zIndex.val(val);

            $contextMenu.hide();
        },

        //废弃
        _getRelativePos: function ($obj) {
            var cur_offset = $obj.offset(),
                box_offset = $output.offset(),
                offset = {
                    left: cur_offset.left - box_offset.left,
                    top: cur_offset.top - box_offset.top
                };
            return offset;
        },
        
        //废弃
        _resetCssPosVal: function ($obj) {
            var val = core._getInputPosVal(),
                offset = core._getRelativePos($obj);
            $obj.attr('data-origin-pos', JSON.stringify(val));
            if ($obj.hasClass('m_cur')) {
                $obj.css({
                    left: offset.left,
                    top: offset.top,
                    right: 'auto',
                    bottom: 'auto'
                });
            }
        },
        //废弃
        _calculatePos: function ($obj, curPos) {
            var box = {
                w: $output.width(),
                h: $output.height()
            },
                target = {
                    w: $obj.width(),
                    h: $obj.height()
                },
                left = curPos.left,
                right = box.w - target.w - curPos.left,
                top = curPos.top,
                bottom = box.h - target.h - curPos.top,
                vert = top > bottom ? 'bottom' : 'top',
                hori = left > right ? 'right' : 'left';

            core._resetPosition($obj);

            if (vert === 'bottom') {
                $obj.css('bottom', bottom);
            } else {
                $obj.css('top', top);
            }

            if (hori === 'right') {
                $obj.css('right', right);
            } else {
                $obj.css('left', left);
            }

            core._initPosVal($obj);

        },

        //transform rgb or rgba to hex color
        _rgb2hex: function(rgb) {

            if (rgb.indexOf('#') > -1) {
                return {
                    hex: rgb,
                    opacity: 1
                };
            } else {
                var rgba = rgb.split('(')[1].split(')')[0].split(','),
                    hex = [
                        parseInt(rgba[0]).toString(16),
                        parseInt(rgba[1]).toString(16),
                        parseInt(rgba[2]).toString(16)
                    ],
                    opacity = rgba.length === 4 ? rgba[3] : 1;

                $.each(hex, function(idx, val) {
                    if (val.length === 1) hex[idx] = '0' + val;
                });
                return {
                    hex: '#' + hex.join(''),
                    opacity: opacity
                };
            }
        },

        //初始化元素样式给编辑，data-type为组合模式
        _initCssToEdit: function($obj) {
            var styles = $obj.attr('style'),
                pattern = $obj.data('type');

            core._showEditPanel(pattern);

            core._getObjStyle($obj, styles, pattern);

            core._setCustomProperty($obj, pattern);

            core._bindCustomEvent();
            core._bindEditChange();
        },

        /**
         * 根据pattern 即datatype来获取需要的样式值
         * @param  {object} $obj
         * @param  {array} styles
         * @param  {number} pattern
         */
        _getObjStyle: function($obj, styles, pattern) {
            var styleObject = {},
                cssExisted = [],
                cssNotEdit = [];

            //这里可以用pattern 过滤一些设置
            // console.log($obj, styles, pattern);

            if (styles) {
                styleObject = core._inlineStyleToObject(styles);
            }

            //刷选出已经在style attribute中的值
            for (var j = 0, k = cssPattern[pattern]; j < k.length; j++) {
                var value = listCssKey[k[j]];
                _.has(styleObject, value) ? cssExisted.push(value) : cssNotEdit.push(value);
            }


            //设置当前对象的初始样式值
            for (var m = 0; m < cssExisted.length; m++) {
                var key = cssExisted[m];

                core._setInputCss(key, styleObject[key]);
            }

            for (var n = 0; n < cssNotEdit.length; n++) {
                var val = $obj.css(cssNotEdit[n]);
                // $obj[0].style['height']

                core._setInputCss(cssNotEdit[n], val);
            }

        },

        /*
            行内样式转化为Object
         */
        _inlineStyleToObject: function(styles){
            var styleObject = {};

            styles = styles.split(';');
            styles.pop();
            // set a style object to save exist css
            for (var i = 0; i < styles.length; i++) {
                var spliter = styles[i].indexOf('url') > -1 ? ': ' : ':',
                    style = styles[i].split(spliter);

                styleObject[$.trim(style[0])] = $.trim(style[1]);
            }

            return styleObject;
        },

        /**
         * 获取自定义模块属性
         */
        _setCustomProperty: function($obj, pattern) {
            var val1, val2, val3,
                $child = $obj.find('.m_elem');

            switch (pattern) {
                case 1:
                    if($child.length > 0){
                        val1 = $child.css('vertical-align');
                        val1 === 'baseline' && (val1 = 'top');

                        val2 = $child.css('text-align');
                        val2 === 'start' && (val2 = 'left');

                        $vertAlign.find('.vert_'+ val1).trigger('click');
                        $horiAlign.find('.hori_'+ val2).trigger('click');
                        
                        val3 = parseInt($child.css('padding'));

                        $val_padding.val(val3);
                        $ui_padding.slider('value', val3);

                    }
                    break;
                case 5:
                    val1 = $obj.attr('data-src');
                    $('#src_audio').val(val1);
                    $('#audio_demo').attr('src', val1);
                    break;
                case 6: 
                    val1 = $obj.attr('data-src');
                    $('#src_href').val(val1);

                    val2 = $obj.attr('data-bi');
                    if(val2){
                        $('#src_analyze').val(val2);
                    }
                    break;
                case 7:
                    val1 = $obj.attr('data-src');
                    $('#src_video').val(val1);
                    break;
                case 11:
                    val1 = $obj.attr('data-color');
                    val2 = $obj.attr('data-direction');
                    $('#opts_arrowColor').find('.arrow_' + val1).addClass('active').siblings().removeClass('active');
                    $('#opts_arrowDirection').find('.ard_' + val2).addClass('active').siblings().removeClass('active');
                    break;
                case 21:
                    val1 = $obj.attr('data-topicId');
                    // val2 = $obj.find('.btn_reply').text();
                    $('#src_topicId').val(val1);
                    // $('#src_textReply').val(val2);
                    break;
                case 22: 
                    val1 = $obj.attr('data-couponId');
                    val2 = $obj.find('img')[0].src;
                    // val3 = $obj.find('img')[1].src;

                    $('#src_couponId').val(val1);
                    $('#src_couponImg').val(val2);
                    // $('#src_couponBtn').val(val3);
                    break;
                case 23:
                    val1 = $obj.attr('data-vote');

                    $('#src_vote').val(val1);
                    break;
                case 30: 
                        val1 = $obj.attr('data-page');
                        $('#jumpNumber').val(val1);
                    break;
                default:
                    break;
            }
        },

        /*
            绑定自定义模块对应的事件
         */
        _bindCustomEvent: function(){
            $doc
                .off('click.custom')
                .off('change.custom')
                .on('click.custom', '#opts_vertAlign span', function(){
                    var $this = $(this),
                        value = $this.data('value');
                    $this.addClass('active').siblings().removeClass('active');
                    $curEdit.find('.m_elem').css('vertical-align', value);
                })
                .on('click.custom', '#opts_horiAlign span', function(){
                    var $this = $(this),
                        value = $this.data('value');
                    $this.addClass('active').siblings().removeClass('active');
                    $curEdit.find('.m_elem').css('text-align', value);
                })
                .on('click.custom', '#opts_arrowColor span, #opts_arrowDirection span', function(){
                    var $this = $(this),
                        value = $this.data('value'),
                        id = $this.parent().attr('id'),
                        $target = null,
                        name = $this.data('name');
                    $this.addClass('active').siblings().removeClass('active');
                    switch(id){
                        case 'opts_arrowColor':
                            $target = $curEdit.attr('data-color', name).find('.arrow_default');
                            if($target.length > 0){
                                $target.css('border-color', value);
                            }
                            break;
                        case 'opts_arrowDirection':
                            $target = $curEdit.attr('data-direction', name).find('.arrow_guide');
                            if($target.length > 0){
                                $target.removeClass().addClass('arrow_guide '+ value);
                            }
                            break;
                    }
                })
                .on('click.custom', '#btn_clearBg', function(){
                    $cssBgImage.val('none');
                    $curEdit.css('background-image', 'none');
                })
                .on('click.custom', '#btn_applyBg', function(){
                    //上传change url问题
                    $cssBgImage.trigger("change.derective");
                })
                .on('change.custom', '#src_topicId', function(){
                    var $status = $curEdit.find('.status_reply');
                    $curEdit.attr('data-topicId', this.value);
                    // $curEdit.find('.btn_reply').attr('href', 'http://ms.hujiang.com/st/topic/'+ this.value +'/');
                    if(this.value === ''){
                        $status.html('状态：未填写帖子ID');
                    }else{
                        $status.html('状态：尝试提取数据中...');
                        para.st.topicid = parseInt(this.value);
                        core.ajaxGet(URL.ST, para.st, function(data){
                            if(data.Code === 0 && data.Value.Value !== null){
                                $status.html('状态：成功, 已读取到数据, 帖子ID:'+ para.st.topicid +'。<br />实际效果请访问真实页面。');
                            }else{
                                $status.html('状态：所填写的帖子ID或存在问题。');
                            }
                        });
                    }
                })
                // .on('change.custom', '#src_textReply', function(){
                //     $curEdit.find('.btn_reply').html(this.value);
                // })
                //优惠券
                .on('change.custom', '#src_couponId', function(){
                    $curEdit.attr('data-couponId', this.value);
                    //handle 优惠券设置成功判断
                })
                .on('change.custom', '#src_couponImg', function(){
                    $curEdit.find('img')[0].src = this.value;
                })
                .on('click.custom', '#btn_applyBg_coupon', function(){
                    //上传change url问题
                    $('#src_couponImg').trigger("change.custom");
                })
                // .on('change.custom', '#src_couponBtn', function(){
                //     $curEdit.find('img')[1].src = this.value;
                // })
                .on('change.custom', '#src_vote', function(){
                    $curEdit.attr('data-vote', this.value);
                })
                .on('change.custom', '#jumpNumber', function(){
                    $curEdit.attr('data-page', this.value);
                })
                //统计ID
                .on('change.custom', '#src_analyze', function(){
                    $curEdit.attr('data-bi', this.value);
                });
        },

        //常用ajax请求
        ajaxGet: function(url, data, callback, errCallback){
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(data) {
                    callback && callback(data);
                },
                error: function(error) {
                    errCallback && errCallback(err);
                }
            });
        },
        /**
         * standby for PX or Percent
         * 点击可编辑元素，读取并设置编辑框的数值
         * @param {string} key   样式属性名
         * @param {string} value 属性值
         */
        _setInputCss: function(key, value) {
            switch (key) {
                case 'width':
                    // if 100%;
                    if (value.indexOf('%') > -1) {
                        value = value.split('%')[0];
                    } else if (value.indexOf('px') > -1) {
                        value = parseInt(parseInt(value) / screenWidth * 100);
                    }

                    $val_width.val(value);
                    $ui_width.slider('value', value);
                    break;
                case 'height':
                    if (value.indexOf('%') > -1) {
                        value = value.split('%')[0];
                    } else if (value.indexOf('px') > -1) {
                        value = parseInt(parseInt(value) / screenHeight * 100);
                    }

                    $val_height.val(value);
                    $ui_height.slider('value', value);

                    break;
                case 'color':
                    $css_color.minicolors('value', core._rgb2hex(value).hex);
                    break;
                case 'background-color':
                    $css_bgcolor.minicolors('value', core._rgb2hex(value).hex);
                    $css_bgcolor.minicolors('opacity', core._rgb2hex(value).opacity);
                    break;
                case 'background-image':
                    value = value === 'none' ? 'none' : value.indexOf('(') > -1 ? value.split('(')[1].split(')')[0] : value;
                    $cssBgImage.val(value);
                    break;
                case 'animation-name':
                    $htmlAnima.find('.anime_' + value).addClass('active').siblings().removeClass('active');
                    break;
                case 'animation-duration':
                    value = value.split('s')[0];
                    $val_animaDura.val(value);
                    $ui_animaDura.slider('value', value);
                    break;
                case 'animation-delay':
                    value = value.split('s')[0];
                    $val_animaDelay.val(value);
                    $ui_animaDelay.slider('value', value);
                    break;
                case 'animation':
                    //初始化animation 数值
                    //#BUG：修改weixin等浏览器显示问题，animation去除running字符串后显示
                    value = value.replace(' running', '');
                    $curEdit.css('animation', value);
                    console.log(value);

                    //fix bug fillmode always be none
                    if(value.indexOf('normal none') > -1){
                        $curEdit.css('animation-fill-mode', 'forwards');
                    }
                    if(value.indexOf('none') === 0){
                        $curEdit.css('opacity', 1);
                    }

                    break;
                case 'z-index':
                    value = value === 'auto' ? 0 : value;
                    $css_zIndex.val(value);
                    break;
                case 'border-radius':
                    value = value === '0px' ? 0 : value.split('px')[0];
                    $val_radius.val(value);
                    $ui_radius.slider('value', value);
                    break;
                case 'left':
                    if (value.indexOf('%') > -1) {
                        value = value.split('%')[0];
                    } 
                    $cssLeft.val(value);
                    break;
                case 'top':
                    if (value.indexOf('%') > -1) {
                        value = value.split('%')[0];
                    } 
                    $cssTop.val(value);
                    break;
                    // case 'padding-top':
                    // case 'padding-right':
                    // case 'padding-bottom':
                    // case 'padding-left':
                default:
                    $('#css_' + key).val(value);
                    break;
            }
        },

        //初始化右侧编辑模块, 根据pattern定义的控制显示, 此处比较难读
        _showEditPanel: function(pattern) {

            //bind operate response
            var i, arr = blockPattern[pattern];
            $('#tab_css .input_block').hide();
            

            for (var i = 0; i < arr.length; i++) {
                $(listInputBlock[arr[i]]).show();
            }
            if(pattern === 0 || pattern === 3 || pattern === 21){
                $tabCss.trigger('mouseenter');
                $tabAnima.hide();
            }else{
                $tabAnima.show();
            }

        },

         /**
         * 绑定编辑事件
         */
        _bindEditChange: function() {

            // var $child = $curEdit.children('.m_elem'),
            //     hasChild = $child.length > 0,
            //     $target = hasChild ? $child : $curEdit;

            $doc
                .off('change.derective')
                .on('change.derective', '#css_height', function() {
                    var val = this.value;
                    $curEdit.css('height', val + '%');
                    $ui_height.slider('value', val);
                })
                .on('change.derective', '#css_width', function() {
                    var val = this.value;
                    $curEdit.css('width', val + '%');
                    $ui_width.slider('value', val);
                })
                .on('change.derective', '#css_left, #css_top', function() {
                    var prop = this.id.split('css_')[1];
                    $curEdit.css(prop, this.value + '%');
                })
                .on('change.derective', '#css_animaDelay', function(){
                    var val = this.value;
                    $ui_animaDelay.slider('value', val);
                    if($curEdit.hasClass('page')) return;
                    $curEdit.css({
                        'animation-delay': val + 's'
                    });
                })
                .on('change.derective', '#css_animaDuartion', function(){
                    var val = this.value;
                    $ui_animaDura.slider('value', val);
                    if($curEdit.hasClass('page')) return;
                    $curEdit.css({
                        'animation-duration': val + 's'
                    });
                })
                .on('change.derective', '#input_postion .form_control', function() {
                    var val = this.value,
                        key = this.id.split('_')[1];
                    $curEdit.css(key, val);
                })
                .on('change.derective', '#css_bgImage', function() {
                    var val = this.value,
                        size = $curEdit.css('background-size');
                        
                    console.log(size);
                    if (val === 'none') {
                        $curEdit.css('background-image', 'none');
                    } else {

                        $curEdit.css({
                            'background-image': 'url("' + val + '")',
                            'background-repeat': 'no-repeat',
                            'background-position': 'center center'
                        });
                        if(size !== 'auto'){
                            $curEdit.css({'background-size': size });
                        }else{
                            $curEdit.css({'background-size': 'auto 100%'});
                        }
                    }
                })
                .on('change.derective', '#css_zIndex', function() {
                    var val = this.value;
                    $curEdit.css('z-index', val);
                })
                .on('change.derective', '#input_borderRadius .form_control', function() {
                    var val = this.value,
                        $this = $(this),
                        key = $this.data('key'),
                        $ui = $this.closest('.input_cont').find('.ui_slider');
                    $curEdit.css(key, val + 'px');
                    $ui.slider('value', val);
                })
                .on('change.derective', '#src_audio', function() {
                    $curEdit.attr('data-src', this.value);
                })
                .on('change.derective', '#src_video', function() {
                    $curEdit.attr('data-src', this.value).find('video').attr('src', this.value);
                })
                .on('change.derective', '#src_href', function() {
                    $curEdit.attr('data-src', this.value);
                });
        },

        /*
         * 移除Anima样式，该方法不用
         */
        _removeAnimaCls: function($obj, reg) {
            var cls = $obj.attr('class'),
                re = reg || /\banima\w*\b/g;
            //去空格， 去正则匹配的class
            cls = cls.replace(re, '').replace(/\s+/g, ' ');
            $obj.attr('class', cls);
        },

        //百度浏览器
        showUE: function(html) {
            UE.getEditor('ueditor').ready(function() {
                this.reset();

                //返回普通编辑模式
                if (this.queryCommandState('source')) {
                    this.execCommand('source');
                }
                this.setContent(html);

                $uedit.show();
                $bglayer.show();
                this.setShow();
            });
        },

        hideUE: function() {

            $uedit.hide();
            $bglayer.hide();
            uedit.setHide();
        },

        saveEdit: function() {
            var html = uedit.getContent(),
                isEditable = $curEdit.hasClass('item_edit'),
                isOutput = $curEdit.hasClass('wrapper');
            if (isEditable) {
                $curEdit.find('.m_elem').html(html);
            }
            if (isOutput){
                $output.find('.wrapper').html(html);
                core._savePage();
            }
            core.hideUE();
        },

        /**
         * 工具类 copy来的
         */
        getOriginHtml: function($obj) {
            var $o = $(document.createElement('div'));
            $o.html($obj.clone());
            return $o.html();
        },


//##############################################################################################################
//##############################################################################################################

        /**
         * 模板数据
         */
        getTemplate: function() {

            $.get('scripts/data_template.js', function(data) {

                tmplData = data_template;
                var html = core._getTemplateHtml(data_template);
                $pageTmpl.html(html);
            });

            $.get('scripts/data_others.js', function(data) {
                otherData = other_template;
                var html = core._getTemplateHtml(other_template);
                $otherTmpl.html(html);
            });

            $.get('scripts/data_apis.js', function(data) {
                apiData = api_template;
                var html = core._getTemplateHtml(api_template);
                $apiTmpl.html(html);
            });

            $.get('scripts/data_logos.js', function(data) {
                logoData = logo_template;
                var html = core._getTemplateHtml(logo_template);
                $logoTmpl.html(html);
            });

            $.get('scripts/data_weixin.js', function(data){
                weixinData = weixin_template;
                var html = core._getTemplateHtml(weixin_template);
                $weixinTmpl.html(html);
            });
        },
        _getTemplateHtml: function(data) {
            var html = '';
            for (var i = 0, l = data.length; i < l; i++) {
                html += '<div class="col-5" data-tmplId="' + data[i].id + '">' +
                    '<div class="tmpl_box">'+
                    '<img src="' + data[i].imgSrc + '" alt="' + data[i].name + '">' +
                    '<div class="tmpl_info">' + data[i].name + '</div>' +
                    '</div></div>';
            }
            return html;
        },

        // getTemplate: function () {
        //     core.getTemplateFromService("data_template", $pageTmpl, 0);
        //     core.getTemplateFromService("data_img", $imgTmpl, 1);
        //     core.getTemplateFromService("data_text", $textTmpl, 2);
        //     core.getTemplateFromService("data_btn", $btnTmpl, 3);
        // },
        /**
        * 模板数据
        * 服务器端获取
        */
        // getTemplateFromService: function (fileName, $tmpl, dataIndex) {
        //     $.ajax({
        //         url: "/ztTemplateAdmin/Handler/ZTFactoryHandler.ashx?op=GetTemplate&random=" + Math.random(),
        //         type: "get",
        //         data: {
        //             "fileName": fileName
        //         },
        //         dataType: "json",
        //         success: function (data) {
        //             templateData[dataIndex] = data.Value.Value;
        //             var html = core._getTemplateHtml_col5(data.Value.Value, dataIndex);
        //             $tmpl.html(html);
        //         }
        //     });
        // },

        /**
         * 获取页面数据
         * 服务器端获取
         */
        getPageDataFromService: function () {
            $.ajax({
                url: "/ztTemplateAdmin/Handler/ZTFactoryHandler.ashx?op=GetPageIndoByCategoryId&random=" + Math.random(),
                type: "get",
                data: {
                    id: pCateId
                },
                dataType: "json",
                success: function (data) {
                    if (data.Value.PageData.CategoryId === 0) {
                        pageDBopType = "ADD";
                        //无内容页数据(新增)
                        // pageData.pop();
                    } else {
                        //有内容页
                        pageData = JSON.parse(data.Value.PageData.editContent);

                        var customData = JSON.parse(data.Value.PageData.customData),
                            swipe = customData.swipeDirection;
                        core._initAfterGetData(customData);
                        pageDBopType = "EDIT";
                        pageID = data.Value.PageData.ID;
                        // console.log(customData);
                        _page_option.loop = customData.isLoop;
                        _page_option.cls = _page_option.cls = swipeOption[swipe];
                        pageInfo.direction = swipe;
                        $funcbtns.attr('class', htmlBtn[swipe].cls);
                        $btnPrev.html(htmlBtn[swipe].prev);
                        $btnNext.html(htmlBtn[swipe].next);
                    }
                    core.initAfterPageLoad();
                },
                error: function(data){
                    alert('fail to init page Data!');
                }
            });
        },
        _initAfterGetData: function(customData){
            console.log(customData);
            $("#swipeDirection").val(customData.swipeDirection);  //滑动方式
            $("#globalAudio").val(customData.globalAudio);        //全局音乐
            if(customData.globalAudio !== ''){
                $output.find('.player').show();
            }
            $("#isLoop").attr("checked", customData.isLoop);      //是否循环
            $('.wrapper').attr('style', customData.wrapAttr);
        },

        /**
         * 更新页面数据
         * 服务器端获取
         */
        UpdatePageDataToService: function (opType) {
            var preContent = '', 
                savePageData = core.getData(),
                editContent = JSON.stringify(savePageData.pageData),
                pageHtml = savePageData.pageHtml,
                resetBtn = function(){
                    isSaving = false;
                    $btnSave.removeClass().addClass('btn btn-success');
                };

            if(canEdit === '0') {
                alert('Sorry,你没有权限保存该专题~');
                return;
            }

            isSaving = true;

            for (var n = 0; n < pageHtml.length; n++) {
                preContent += pageHtml[n].html;
            }


            var customData = {};
            customData.isLoop = savePageData.isLoop;
            customData.swipeDirection = savePageData.swipeDirection;
            customData.hasCoupon = $('.item_coupon').length > 0 ? true : false;
            customData.globalAudio = $('#globalAudio').val();         //全局音乐
            customData.wrapAttr = savePageData.wrapAttr;
            JSON.stringify(savePageData);

            //  default.aspx.cs 中
            //      上面 申明
            //      protected string hasCoupon = string.Empty
            //      下面同时 绑定
            //      if(obj["hasCoupon"].Value != null){
            //          hasCoupon = obj["hasCoupon"].Value.toString()
            //      }
            //
            console.log('跟踪上传数据:',savePageData.pageData);
            $.ajax({
                url: "/ztTemplateAdmin/Handler/ZhuanTi.ashx?op=EditCategoryPagesInfo&random=" + Math.random(),
                type: "post",
                data: {
                    id: pageID,
                    categoryId: pCateId,
                    content: preContent,
                    sharedTitle: '',
                    shareImage: '',
                    sharedDes: '',
                    pageNum: 0,
                    opType: pageDBopType,
                    customData: JSON.stringify(customData),
                    editContent: editContent
                },
                dataType: "json",
                success: function (data) {
                    if (data.Code == 1) {
                        switch (opType) {
                            case "PRE":
                                break;
                            case "SAVE":
                                if (pageDBopType == "ADD") {//如果是第一次进入编辑页面，更新未编辑状态.
                                    pageDBopType = "EDIT";
                                    pageID = data.Value;
                                }
                                alert("保存成功!");

                                resetBtn();
                                //window.location.reload();
                                break;
                            case "OK":
                                window.location.href = "/ztTemplateAdmin/Category.aspx?langs=all";
                                break;
                        }
                    }
                    else {
                        resetBtn();
                        alert(data.Message);
                    }

                },
                error: function(data){
                    resetBtn();
                    alert('提交数据出问题了，或新开一个窗口重新登录CMS~');
                }

            });
        },

//##############################################################################################################
//##############################################################################################################

        /**
         * 操作页面
         * pageData ：存放页面"操作数据"的数组
         */
        _initPage: function() {

            this._bindEventOperatePage();
            //渲染页面和管理页面, 包含了初始化页面滚动
            this._renderPage();
        },

        //得到当前显示页面内容，保存到数组, 去掉额外的样式
        //增加空白分页
        _addPage: function() {

            core._updatePage();

            pageData.push({
                html: html_blankpage
            });

            _page_option.pageStart = pageInfo.index = pageData.length - 1;
            core._renderPage();
        },

        //复制当前分页
        _copyPage: function() {
            core._updatePage();

            var html = pageData[pageInfo.index].html;

            pageData.push({
                html: html
            });

            _page_option.pageStart = pageInfo.index = pageData.length - 1;

            core._renderPage();
        },

        //删除当前分页
        _removePage: function() {

            pageData.splice(pageInfo.index, 1);
            //note: pageData.length has minused one

            // $numCurPage.html(index + 1);
            _page_option.pageStart = pageInfo.index = pageInfo.index === pageData.length ? pageData.length - 1 : pageInfo.index;
            
            core._renderPage();
        },

        //交换页面顺序
        _swapPage: function(oldIdx, newIdx){
            var temp = null;

            core._updatePage();

            // temp = pageData[oldIdx].html;
            // pageData[oldIdx].html = pageData[newIdx].html;
            // pageData[newIdx].html = temp;

            temp = pageData[oldIdx];

            pageData.splice(oldIdx, 1);

            pageData.splice(newIdx, 0, temp);

            _page_option.pageStart = pageInfo.index = newIdx;
            core._renderPage();
        },

        //更新所有页面数据
        _updatePage: function() {
            var $target = $('.page'),
                html;

            core._destroyUiStatus();

            //摧毁pagetrans组件，返回原始DOM
            _page.destroy();
            $('.page-current').removeClass('page-current');
            pageData = [];
            $target.each(function(idx, obj){
                html = core.getOriginHtml($(obj));
                pageData.push({
                    html: html
                });
                console.log(pageData, html);
                // pageData[idx].html = html;
            });
            //save the relative pure string
        },

        //保存页面数据
        _savePage: function(){
            core._updatePage();
            core._renderPage();
        },

        //绑定操作页面的事件
        _bindEventOperatePage: function() {

            //记录排序前后的index值, 页序排序组件
            var old_index, new_index;

            $pageCount.sortable({
                containment: 'parent',
                items: '.page_square',
                placeholder: 'ui_tip',
                start: function(event, ui){
                    var $item = $(ui.item);
                    old_index = $item.index();
                },
                stop: function(event, ui){
                    var $item = $(ui.item);

                    new_index = $item.index();

                    var alertString = (old_index + 1) + ' 插在' + (old_index > new_index ? new_index : new_index + 1) + ' 后面吗';

                    if(old_index !== new_index){
                        window.alert(alertString);
                        core._swapPage(old_index, new_index);
                    }
                }
            });

            $doc
                .on('click', '#btn_addpage', core._addPage)
                .on('click', '#btn_copyPage', core._copyPage)
                .on('click', '#btn_removePage', core._removePage)
                .on('click', '#pageCount .page_square', function(event) {
                    var index = $(this).index();
                    _page.jump(index);
                })
                .on('change', '#swipeDirection', function() {
                    var val = parseInt($('#swipeDirection').val());
                    pageInfo.direction = val;
                    _page_option.cls = swipeOption[val];
                    _page.init(_page_option);

                    $funcbtns.attr('class', htmlBtn[val].cls);
                    $btnPrev.html(htmlBtn[val].prev);
                    $btnNext.html(htmlBtn[val].next);

                })
                .on('click', '#isLoop', function() {
                    var val = document.getElementById("isLoop").checked;
                    _page_option.loop = val;
                    _page.init(_page_option);
                })
                .on('change', '#globalAudio', function(){
                    if(this.value === ''){
                        $output.find('.player').hide();
                    }else{
                        $output.find('.player').show();
                    }
                })
                .on('click', '#btn_prev', function(event) {
                    _page.prev();
                })
                .on('click', '#btn_next', function(event) {
                    _page.next();
                });

            $doc
                .on('click', '#page_templates .col-5', function(event) {
                    var $this = $(this),
                        template = null,
                        templateId = parseInt($this.attr('data-tmplId'));

                    template = _.find(tmplData, function(obj) {
                        return obj.id === templateId;
                    });

                    var confirm = window.confirm('确定要覆盖当前页面吗？');
                    if(confirm){
                        pageData[pageInfo.index].html = template.html;
                        core._renderPage();
                    }

                })
                .on('click', '#tab_uis .col-5', function(event) {
                    var $this = $(this),
                        id = $this.parent().attr('id'),
                        template = null,
                        templateId = parseInt($this.attr('data-tmplId')),
                        $target = $('#page' + pageInfo.index).find('.m_cont');

                    switch(id){
                        case 'other_templates':
                            template = _.find(otherData, function(obj) {
                                return obj.id === templateId;
                            });
                            break;
                        case 'api_templates':
                            template = _.find(apiData, function(obj) {
                                return obj.id === templateId;
                            });
                            if(templateId === 1 && $output.find('.item_topicST').length > 0){
                                alert('社团评论已存在，且尚只存在一个');
                                return;
                            }
                            if(templateId === 3 && $output.find('.item_vote').length > 0){
                                alert('调查通已存在, 且只允许存在一个');
                                return;
                            }
                            break;
                        case 'logo_templates':
                            template = _.find(logoData, function(obj) {
                                return obj.id === templateId;
                            });
                            break;
                        case 'weixin_templates':
                            template = $.grep( weixinData, function( obj, i ){
                                return obj.id === templateId;
                            })[0];
                            break;
                    }
                    

                    $target.append(template.html);
                    $panelTemplate.find('.bk_tab_cont').hide();
                    core._initUiStatus();
                });

            // $doc.on('click', '#btn_complete', function() {
            //     console.log(core.getData());
            // });
        },

        //重置页面中UI组件，初始样式样式
        _initUiStatus: function() {


            var $mcont = $('.page').eq(pageInfo.index).find('.m_cont'),
                $drag = $mcont.find('.item_drag');

            $pageCount.find('.page_square').eq(pageInfo.index).addClass('active').siblings().removeClass('active');


            // $mcont.sortable({
            //     containment: 'parent',
            //     items: '.item_sort',
            //     placeholder: 'ui_tip',
            // });

            $drag.each(function() {
                var $this = $(this);
                core._toDragResizable($this);
            });

            if (mu.isWeixin) {
                $('.share_wx').show();
            } else {
                $('.share_nwx').show();
            }

        },

        //转变成可拖拽可缩放
        _toDragResizable: function($obj) {

            //force element into px unit
            // $obj.css({
            //     width: $obj.css('width'),
            //     height: $obj.css('height')
            // });

            $obj.draggable({
                containment: 'parent',
                grid: [2, 2],
                zIndex: 9,
                start: function() {
                    $obj.css({
                        'position': 'absolute'
                    });
                },
                drag: function(event, ui) {
                    // core._calculatePos($obj, ui.position);
                },
                stop: function(event, ui) {

                    core._resetPostion($obj, ui.position);
                }
            });

            // $obj.draggable('disable').removeClass('item_sort ').addClass('item_drag');

            $obj.resizable({
                grid: [2, 2],
                containment: 'parent',
                handles: 'n, e, s, w, ne, se, sw, nw',
                resize: function(event, ui) {
                    // core._initCssSize(ui.size.width, ui.size.height);
                },
                stop: function(event, ui) {
                    
                    core._resetPostion($obj, ui.position);
                    core._resetSize($obj, ui.size);
                    
                }
            });

        },

        /**
         * _resetPostion和_resetSize方法是针对draggable和resizable重设尺寸大小和位置
         * 当前均为设置为百分比尺寸
         */
        _resetPostion: function($obj, offset){
            var l = ( offset.left / screenWidth * 100 ).toFixed(0) + '%',
                t = ( offset.top / screenHeight * 100 ).toFixed(0) + '%';

            $obj.css({
                'top': t ,
                'left': l
            });

            core._setInputCss('top', t);
            core._setInputCss('left', l);
        },

        _resetSize: function($obj, offset){
            var w = ( offset.width / screenWidth * 100 ).toFixed(0) + '%',
                h = ( offset.height / screenHeight * 100 ).toFixed(0) + '%';

            $obj.css({
                'width': w,
                'height': h
            });

            core._setInputCss('width', w);
            core._setInputCss('height', h);
        },

        _destroyUiStatus: function() {
            var $mcont = $('.m_cont'),
                $drags = $('.item_drag');

            $mcont.removeClass('anima_on');

            // $cont.each(function() {
            //     var $this = $(this);

            //     $this.sortable('instance') !== undefined && $this.sortable('destroy');
            // });
            $drags.each(function() {
                var $this = $(this);

                $this.draggable('instance') !== undefined && $this.draggable('destroy');
                //destroy the resizable instance
                $this.resizable('instance') !== undefined && $this.resizable('destroy');
            });
        },

       //重新填写整个静态HTML, 初始化各元素状态 
        _renderPage: function() {

            var html_btn = '',
                html_page = '';

            for (var i = 0, l = pageData.length; i < l; i++) {
                html_btn += '<div class="page_square">' + (i + 1) + '</div>';
                html_page += pageData[i].html;
            }
            $pageCount.html(html_btn);
            $output.find('.wrapper').html(html_page);


            core._initUiStatus();

            _page.init(_page_option);
            $('.m_cont').hide();
            $('#page' + pageInfo.index).find('.m_cont').show();

            $viewbox.trigger('click');
        },

        _getOutput: function () {
            
            core._savePage();

            _page.destroy();
            core._destroyUiStatus();
            $('.page-current').removeClass('page-current');

            //get an new jq obect 
            var $clone = $output.clone();

            $clone.find('.m_cur').removeClass('m_cur');
            $clone.find('.page').find('.m_cont').hide();
            $clone.find('.share_wx, .share_nwx').hide();
            $clone.find('.item_drag').each(function(idx, elem){
                var $elem = $(elem),
                    styleObject = core._inlineStyleToObject($elem.attr('style')),
                    inlineStyle, attr,
                    webkitArr = ['-webkit-animation', '-webkit-animation-play-state', '-webkit-animation-duration', '-webkit-animation-name', '-webkit-animation-delay', '-webkit-animation-fill-mode'],
                    idx = $elem.closest('.page').index();

                for(var i = 0, l = webkitArr.length; i < l; i++){
                    //虽然obj属性为undefined，stringify时会去掉当前属性
                    if(_.has(styleObject, webkitArr[i])){

                        attr = webkitArr[i].split('-webkit-')[1];
                        if(webkitArr[i] === '-webkit-animation' && styleObject[webkitArr[i]].indexOf('running') > -1){
                            styleObject[webkitArr[i]] = styleObject[webkitArr[i]].replace(' running', '');
                            console.log(styleObject[webkitArr[i]]);
                        }
                        styleObject[attr] = styleObject[webkitArr[i]];
                    }
                }
                inlineStyle = JSON.stringify(styleObject).replace(/\{|\}/g, '').replace(/\"\,/g, '"; ').replace(/\"/g,'').replace(/\:\:\;/g,';').replace(/\:\;/g,';').concat(';');
                console.log('跟踪在页面 '+ idx +' 的样式转化', {'styleOBJ': styleObject,'string': inlineStyle});

                $elem.attr('style', inlineStyle);
            });

            $clone.find('.item_topicST').html('');
            
            _page.init(_page_option);
            $('#page' + pageInfo.index).find('.m_cont').show();
            core._initUiStatus();

            var htmlArr = [],
                wrapAttr = $('.wrapper').attr('style');
            $clone.find('.page').each(function (index) {
                var $this = $(this),
                    html = core.getOriginHtml($this);
                htmlArr[index] = {
                    html: html
                };
            });


            return {
                pageData: pageData,
                pageHtml: htmlArr,
                allHtml: $clone.html(),
                wrapAttr: wrapAttr
            };
            //handle $clone
        },

        getData: function () {
            var data = core._getOutput();
            return {
                pageData: data.pageData,
                pageHtml: data.pageHtml,
                allHtml: data.allHtml,
                wrapAttr: data.wrapAttr,
                isLoop: _page_option.loop,
                swipeDirection: pageInfo.direction
            };
        }

    };

    core.init();

    window.zt = core;

})(this, window.jQuery);