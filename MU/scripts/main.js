// require(['vender/jquery/jquery-2.1.3.min.js'], function($){
//     console.log($);
// });
// 

require.config({
    baseUrl: '.',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'vender/jquery/jquery-1.9.1.min'
    }
});

require(['jquery'], function( $ ) {
    // console.log( $ ) // OK
    var $body = $('body');
    console.log($body);
});

require(['vender/app/select2'], function(ss){

    ss.test2('body');
});

require(['vender/app/moduletest'], function(module){
    
});