'use strict';

var gulp = require('gulp');
var plugins = require('./task/loadPlugins.js');

require('./task/html.js');
require('./task/sass.js');
require('./task/image.js');
require('./task/clean.js');
require('./task/copy.js');
require('./task/revision.js');
require('./task/webpackdev.js');

require('./task/temp.js');


var bsConfig = {
    server: {
        baseDir: ['public/'],
        directory: true             //文件路径列表
    },
    ui: {
        port: 3025,
        weinre: {
            port: 9090
        }
    },
    open: 'external',
    port: 3024,
    logConnections: true
};

gulp.task('dev', ['clean', 'html:watch', 'compass:watch', 'image:watch', 'copy:watch', 'webpack:watch'], function(){
    plugins.bs.init(bsConfig);
});

// gulp.task('build')
gulp.task('test', function(){
    console.log('test');
});
