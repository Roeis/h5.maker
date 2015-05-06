/**
 * name:
 * author: roeis
 * description:
 */
(function() {
    'use strict';

    function Product(id, description) {
        this.getId = function() {
            return id;
        };
        this.getDescription = function() {
            return description;
        };
    }

    function Cart(eventAggregator) {
        var items = [];

        this.addItem = function(item) {
            items.push(item);
        };
    }

    var products = [new Product(1, "Star Wars Lego Ship"),
            new Product(2, "Barbie Doll"),
            new Product(3, "Remote Control Airplane")
        ],
        cart = new Cart();

    function addToCart() {
        var productId = $(this).attr('id');
        var product = $.grep(products, function(x) {
            return x.getId() == productId;
        })[0];
        cart.addItem(product);

        var newItem = $('<li></li>').html(product.getDescription()).attr('id-cart', product.getId()).appendTo("#cart");
    }

    // products.forEach(function(product) {
    //     var newItem = $('<li></li>').html(product.getDescription())
    //         .attr('id', product.getId())
    //         .dblclick(addToCart)
    //         .appendTo("#products");
    // });


    function Event(name) {
        var handlers = [];

        this.getName = function() {
            return name;
        };

        this.addHandler = function(handler) {
            handlers.push(handler);
        };

        this.removeHandler = function(handler) {
            for (var i = 0; i < handlers.length; i++) {
                if (handlers[i] === handler) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        };

        this.fire = function(eventArg) {
            handlers.forEach(function(handler) {
                handler(eventArg);
            });
        };
    }

    function EventAggregator() {
        var events = [];

        function getEvent(eventName) {
            return $.grep(events, function(event) {
                return event.getName() === eventName;
            })[0];
        }

        this.publish = function(eventName, eventArgs) {
            var event = getEvent(eventName);

            if (!event) {
                event = new Event(eventName);
                events.push(event);
            }

            event.fire(eventArgs);
        };

        this.subscribe = function(eventName, handler) {
            var event = getEvent(eventName);

            if (!event) {
                event = new Event(eventName);
                events.push(event);
            }

            event.addHandler(handler);
        };
    }



}());

// module
// 一个立即执行函数，return出一个object，同时var blogModule = this Oject,
var blogModule = (function() {
    'use strict';
    var my = {},
        privateName = 'roeis';

    function privateFunc() {
        // var args = Array.prototype.slice.apply(arguments);
        // console.log(args);
        // inner function
    }

    my.name = privateName;
    my.func = function() {

        var args = Array.prototype.slice.call(arguments, 1);
        console.log(args);
        privateFunc(args);
    };

    return my;

}());



(function(core) {
    'use strict';

    core.addPhoto = function() {
        //
        console.log('add a photo');
    };

    // return core;

}(blogModule));

console.log(blogModule.func('11', '3'));


var mu = mu || {};

mu.util = {};
mu.subModule = {};
mu.util.subFunc = function() {
    console.log('Func');
};
mu.util.methodA = function() {
    console.log('methodA');
};

//MU如果存在，MU，否则即为{}，空对象
var MU = MU || {};

// 
MU.namespace = function(ns) {
    var parts = ns.split('.'),
        parent = MU,
        i;

    if (parts[0] === 'MU') {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i++) {
        if(typeof parent[parts[i]] === 'undefined'){
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}

var slider =  MU.namespace('module.slider');

slider.test = function(){
    return 3;
}



// req.createNode = function (config, moduleName, url) {
//         var node = config.xhtml ?
//                 document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
//                 document.createElement('script');
//         node.type = config.scriptType || 'text/javascript';
//         node.charset = 'utf-8';
//         node.async = true;
//         return node;
//     };

// function _loadJs(jsURL, completeHandle) {
//         var head = document.getElementsByTagName('head')[0],
//             jsLoader = document.createElement('script'),
//             isComplate = false,
//             isExisted, loadCompleteHandle = function() {
//                 isComplate = true;
//                 hjf.base.BOM.Event.removeEventListener(jsLoader, 'load', loadCompleteHandle);
//                 hjf.base.BOM.Event.removeEventListener(jsLoader, 'readystatechange', readyHandle);
//                 loadCompleteHandle = function() {};
//                 completeHandle && completeHandle();
//             },
//             readyHandle = function() {
//                 if (/loaded|complete/.test(jsLoader.readyState) && isComplate == false) {
//                     loadCompleteHandle();
//                 }
//             };
//         jsLoader.async = true;
//         jsLoader.setAttribute("type", "text/javascript");
//         jsLoader.src = jsURL;
//         hjf.base.BOM.Event.addEventListener(jsLoader, 'load', loadCompleteHandle);
//         hjf.base.BOM.Event.addEventListener(jsLoader, 'readystatechange', readyHandle);
//         hjf.base.BOM.Event.addEventListener(jsLoader, 'error', loadCompleteHandle);


//         //var jsList = [].slice.call(document.getElementsByTagName("script"));
//         var jsList = document.getElementsByTagName("script");
//         for (var i = 0, len = jsList.length; !isExisted && i < len; i++) {
//             isExisted = jsURL == jsList[i].getAttribute("src");
//         };

//         isExisted || head.appendChild(jsLoader);
//     };

MU.version = '1.0.1';

MU.load = {
    isComplete: false,
    createScriptNode: function(){
        var node = document.createElement('script');

        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        return node;
    },
    onScriptLoad: function(event, invoke){
        console.log(event);
        if(event.type === 'load'){
            invoke && invoke();
        }
    },
    onScriptError: function(event){
        console.log(event);
    },
    _load: function(url, invoke){
        // console.log(this);
        var core = this;
        var head = document.getElementsByTagName('head')[0],
            node = core.createScriptNode();

        node.addEventListener('load', function(event){
            core.onScriptLoad(event, invoke);
        }, false);
        node.addEventListener('error', core.onScriptError, false);

        node.src = url;

        // console.log(node);

        head.appendChild(node);
        

    },
    loadJS: function(){

    }
};


// MU.load._load('/plugin/scripts/property.js', function(){
//     core.getCss();
// });




////////
// 队列 //
////////

// 先进先出

function Queue(){
    this.queue = [];
}

Queue.prototype = {
    enqueue: function(element){
        this.queue.push(element);
    },
    dequeue: function(){
        return this.queue.shift();
    },
    first: function(){
        return this.queue[0];
    },
    tail: function(){
        return this.queue[this.queue.length - 1];
    },
    toString: function(){
        var string = '';
        for(var i = 0; i < this.queue.length; i++){
            string += this.queue[i] + '\n';
        }
        return string;
    },
    empty: function(){
        return this.queue.length === 0 ? true : false;
    }
};

var q = new Queue();

// function Que(){
//     this.dataBase = [];
// }
// Que.prototype = new Queue();

// var q2 = new Que();

q.enqueue('asd1');
q.enqueue('asd2');
q.enqueue('asd3');



/**
 * name: 
 * author: roeis
 * description: 
 */
(function(){
    'use strict';
    
    var expr = /^(?:#([\w-]*))$/;

    function zQuery(selector){
        return new zQuery.fn.init(selector);
    }

    var animation = function(){
        var self = {},
            queue = [],
            firing = false, //动画队列
            first = true;

        // var getStyle = function(obj, attr){
        //     return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
        // };

        var makeAnim = function(element, options, invoke){
            var width = options.width;

            element.style.webkitTransitionDuration = '2000ms';
            element.style.webkitTransform = 'translate3d('+ width +'px, 0, 0)';
            element.addEventListener('webkitTransitionEnd', function(){
                invoke && invoke();
            })
        };

        var _fire = function(){
            if(!firing){
                var onceRun = queue.shift();
                if(onceRun){
                    firing = true;
                    onceRun(function(){
                        firing = false;
                        _fire();
                    })
                }else{
                    firing = true;
                }
            }
        };

        self = {
            add: function(element, options){
                queue.push(function(func){
                    makeAnim(element, options, func);
                });

                if(first && queue.length){
                    first = false;
                    self.fire();
                }
            },
            fire: function(){
                _fire();
            }
        };

        return self;

    }();

    zQuery.fn = zQuery.prototype = {
        run: function(options){
            animation.add(this.element, options);
            return this;
        },

        init: function(selector){
            var match = expr.exec(selector),
                element = document.getElementById(match[1]);

            this.element = element;
            return this;
        }
    };
    zQuery.fn.init.prototype = zQuery.fn;

    window.zQuery = zQuery;

    return zQuery;


})();
// window.$ = zQuery;

// var oDiv = document.getElementById('dlu');
// //调用

// oDiv.onclick = function(){
//     $('#dlu').run({
//             width: 400
//         }).run({
//             width: 100
//         });
// };


/////////
//创建链表 //
/////////

function createLinkList(){
    var links = {},
        prev = null;

    return {
        add: function(val){
            prev = {
                data: val,
                next: prev || null
            };
            console.log(prev);
            // links.length++;
        },
        show: function(fn){
            var temp;
            for(temp = prev; temp; temp = temp.next){
                // fn(temp.data);
                console.log(temp)
            }
            console.log(links);
        }
    }
}
var linksList = createLinkList(); // 创建一个单链表实例
linksList.add("arron1"); 
linksList.add("arron2"); 
linksList.add("arron3");

//
//