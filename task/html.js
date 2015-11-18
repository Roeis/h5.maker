'use strict';

var gulp = require('gulp');
var path = require('path');
var plugins = require('./loadPlugins.js');
var config = require('../config.js');

var base = path.join(config.root.src, config.task.html.src);
var src = path.join(base, '/*.' + config.task.html.extensions);
var dest = path.join(config.root.dest, config.task.html.dest);

var htmlTask = function(env){
    plugins.nunjucksRender.nunjucks.configure([base], {
        watch: false
    });

    var flag = env === 'production';
    // var path = flag ? path : '';

    var stream = gulp.src(src)
        .pipe(plugins.changed(dest))
        .pipe(plugins.nunjucksRender({
            filePath: path
        }))
        .pipe(plugins.gulpif(flag, plugins.htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest(dest))
        .pipe(plugins.bs.stream());

    return stream;

};
gulp.task('html', htmlTask);
gulp.task('html:watch', ['html'], function(){
    gulp.watch(src, ['html']);
});