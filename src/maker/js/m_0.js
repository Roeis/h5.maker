(function() {
    'use strict';

    const standardRatio = 540 / 360;

    var core = {

        init() {
            console.log('h5 maker go');
            this.setSize();
            this.bind();

            var te = document.getElementById("code");
            var editor = window.CodeMirror.fromTextArea(te, {
                mode: 'htmlmixed',
                lineNumbers: true,
                lineWrapping: true,
                selectionPointer: true
            });

            editor.setValue(`
<style>
    .test {
        line-height: 20px;
    }
</style>
<div class="demo1">sdfas</div>
<script>
    var test = 'dasfasd';
</script>
                `);

            console.log(editor.getValue())

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
