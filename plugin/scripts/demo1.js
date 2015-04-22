
/**
 * $ 插件开发
 */

;(function($, undefined){
    'use strict';

    // undefined 最为真实的, 没有传进来的
    $.extend({
        sayHello: function(name){
            console.log('Hello,'+(name ? name: 'dude') + '!');
        },
        log: function(){
            var now = new Date(),
                args = Array.prototype.slice.apply(arguments),
                h = now.getHours(),
                m = now.getMinutes(),
                s = now.getSeconds(),
                time = h + ':' + m + ':' + s;
            console.log('%cAt ' + time + ' Out:', 'font-weight:bold;color:#2A70CE;', args);
        }

    });
    var arr = [12,12,32];
    var obj = {test: 12132, test2: arr};
    $.log(obj, arr, 234234, '234234');


    function loopInvoke(){

    }

    $.fn.pluginName = function(options){
        var defaults = {
            color: '#F50',
            size: '16px'
        };
        $.log(defaults);
        var settings = $.extend({},defaults, options);
        // console.log(settings);
        // 这里的this 指的是用jquery选中的元素，
        // eg: $('a'), this 就是 $('a') 一个jquery对象
        $.log(this);
        return this.each(function(idx, elem){
            var $this = $(this),
                title = $this.attr('title');
            $this.append(':'+title);
            $this.css({
                color: settings.color
            });
        });
    };

    // 另一种写法
    // $.extend($.fn, {
    //     pluginName: function(){
    //         this.css('color', 'yellow');
    //     }
    // });
    
    var defaults = {
        'color': 'red',
        'fontSize': '12px'
    };
    var Beautifier = function(ele, opts){
        this.$element = ele;
        this.options = $.extend({}, defaults, opts);
    };

    Beautifier.prototype = {
        beautify: function(){
            var that = this;
            return this.$element.each(function(){
                var $this = $(this);
                $this.css({
                    'color': that.options.color,
                    'font-size': that.options.fontSize
                });
            });
        }
    };

    $.fn.beautify = function(options){
        var instance = new Beautifier(this, options);

        return instance.beautify();
    };


    var _methods = {
            doMethod: function(){
                console.log('method1');
            },
            doMethod2: function(){
                console.log('method2');
            }
        },
        methods = {
        init: function (options) {

            return this.each(function () {

                var $this = $(this),

                    args = $.extend({}, defaults, options),

                    data = $this.data('tooltip'),
                    tooltip = $('<div />', {
                        text: $this.attr('title')
                    });

                console.log(data);

                // If the plugin hasn't been initialized yet
                if (!data) {

                    /*
                     Do more setup stuff here
                     */

                    $(this).data('tooltip', {
                        target: $this,
                        tooltip: tooltip
                    });
                    
                }

            });
        },
        publicMethod: function(){
            _methods.doMethod();
        },
        destroy: function () {

            return this.each(function () {

                var $this = $(this),
                    data = $this.data('tooltip');

                // Namespacing FTW
                $(window).unbind('.tooltip');
                data.tooltip.remove();
                $this.removeData('tooltip');

            });

        },
        show: function (data) {
            console.log('show', data);
        },
        hide: function () {
            // ...
        },
        update: function (content) {
            // ...
        }
    };

    $.fn.tooltip = function (method) {

        if (methods[method]) {
            //如果存在方法，调用这个方法
            //apply 是 obj.method(arg1, arg2, arg3) 转换成 method(obj, [arg1, arg2, arg3]) 的过程.
            //Array.prototype.slice.call(arguments, 1), 转化成数组
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            //传进来是对象
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }

    };
    

    var Plugin2 = function(element, options){
        this.element = element;
        this.options = options;
        this.init();
    };

    Plugin2.prototype = {
        init: function(){
            this.create();
            console.log('init');
        },
        create: function(){
            console.log(this.element)

        },
        setValue: function(key, value){
            this.options[key] = value;
        },
        publicMethod: function(value){
            console.log('publicMethod', value);
        }
    };

    $.fn.plugin2 = function(options){

        return this.each(function(){

            var $this = $(this),
                data = $this.data('plugin2');

            if(!data){
                var opts = typeof options === 'object' ? options : {};

                opts = $.extend({}, $.fn.plugin2.defaults, opts);
                
                data = new Plugin2(this, opts);

                $this.data('plugin2', data);
            }

            if(typeof options === 'string' && data[options]){
                data[options].apply(this, arguments);
            }

        });
    };

    $.fn.plugin2.defaults = {
        'font': '16px'
    };


    var subArr = [
        {
            'title': '专题',
            'body': '暗色调发斯蒂芬阿斯顿发撒旦法asdf sd是否'
        },
        {
            'title': '专题23',
            'body': '暗色调发斯蒂芬阿斯顿'
        },
        {
            'title': '专题234',
            'body': '暗色调发斯蒂芬阿斯顿发撒旦'
        },
        {
            'title': '专题5',
            'body': '暗色调发斯蒂芬阿斯顿发撒旦法asdf sd是'
        },
        {
            'title': '专题6',
            'body': '暗色调发斯蒂芬阿斯顿发撒旦法asd'
        }
    ];

    var _defaults = {
            data: [],
        };

    var ScrollSub = function(element, options){
        this.element = element;
        this.options = $.extend({}, _defaults, options);
        this.init();
    };

    ScrollSub.prototype = {
        init: function(){
            var that = this,
                $element = $(this.element);
            
            $element.css({
                color: this.options.color
            });
            this.dataArr = [];
            this.count = 0;

            $element.off('click.sub').on('click', function(event){
                that._getEvent(event);
            });
        },

        _getEvent: function(event){
            console.log(event, '323');
        },
        getArr: function(){
            var children  = $element.children();


        },
        pub: function(){
            console.log('pub yeah');
        },
        createHtml: function(arr, pattern){

        },
        loop: function(){

        }
    };

    $.fn.test2 = function(options){
        this.each(function(key, value){
            var $element = $(this),
                data = $element.data('test');

            var instance = new ScrollSub(this, options);


        });

        return this;
    };



    var core = {
            init: function(elem, options){

                console.log('init');
            },
            test: function(){
                console.log('test2_public');
            },
            _test2: function(){
                console.log('test2_private');
            }
        };

    $.fn.scrollSub = function(options){
        //
        var that = this;
        this.pub = function(value){
            console.log('calculate', value);
            this.css('color', value);
        };

        return this.each(function(){

            var $this = $(this),
                options = $.extend({}, defaults, options);
            // console.log(this, that);
            core.init($this, options);

            $this.css({
                color: options.color
            });

        });

    };

    window.ScrollSub = ScrollSub;

    // window.Beautifier = Beautifier;

})(jQuery);
