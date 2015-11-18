'use strict';

var target = 'maker';
var config = {
    root: {
        src: 'src/' + target,
        dest: 'public/' + target,
        build: 'build/' + target
    },
    task: {
        html: {
            src: 'html',
            dest: '.',
            extensions: ['html']
        },
        sass: {
            src: 'sass',
            dest: 'css',
            extensions: ['sass', 'scss', 'css'],
        },
        js: {
            src: 'js',
            dest: 'js',
            extensions: ['js'],
            entry: {
                app: ['app.js']
            }
        },
        image: {
            src: 'image',
            dest: 'image',
            extensions: ['png', 'jpg', 'gif', 'svg']
        },
        iconfont: {
            src: 'iconfonts',
            dest: 'fonts',
            extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
        }
    }
};

module.exports = config;
