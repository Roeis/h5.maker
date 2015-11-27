(function() {
    'use strict';

    const standardRatio = 540 / 360;

    var core = {

        init() {
            console.log('h5 maker go');
            this.setSize();
            this.bind();
        },

        setSize() {
            let size = this.getSize();


            $('.cont').css({
                width: size.width,
                height: size.height,
                left: size.left,
                top: size.top,
                position: 'absolute'
            });
        },

        getSize() {
            // it reread the value when resize or something like that
            let winHeight = document.documentElement.clientHeight || window.innerHeight,
                winWidth = document.documentElement.clientWidth || window.innerWidth,
                ratio = winHeight / winWidth,
                width, height, left, top;

            if (ratio > standardRatio) {
                width = winWidth;
                height = width * standardRatio;
                top = (winHeight - height) / 2;
                left = 0;
            } else {
                height = winHeight;
                width = height / standardRatio;
                left = (winWidth - width) / 2;
                top = 0;
            }

            return {
                width: width,
                height: height,
                top: top,
                left: left
            };
        },

        bind() {
            $(window).on('resize', () => {
                this.setSize();
            });
        }
    };

    core.init();
}());
