/**
 * muslider
 * text scrolling
 */

(function(global, $, undefined) {
    'use strict';

    // var MuSlider = function(element, options){

    // };

    // $.fn.muSlider = function(options){
    //     return this.each(function(key, value){
    //         var element = $(this);

    //         // Return early if this element already has a plugin instance
    //         if(element.data('muslider')){
    //             return element.data('muslider');
    //         }
    //         // Pass options to plugin constructor
    //         var muslider = new MuSlider(this, options);
    //         // Store plugin object in this element's data
    //         element.data('muslider', muslider);
    //     });
    // };

    // $.fn.muSlider.defaults = {

    // };



    //
    var defaults = {

    };

    var core = {
        init: function(){

        },
        loop: function(){
            
        }

    }

    $.fn.muSlider = function(options){

        var setting = $.extend(defaults, options);

        return this.each(function(){
            
            var $this = $(this);
            // get current object
            $this.wrap('<div class="muslider_cont" style="overflow: hidden;"></div>')
            
            console.log($this);
            core.init($this);

        });

    };
    

})(this, window.Zepto);