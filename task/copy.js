'use strict';

var gulp = require('gulp');
var path = require('path');
var plugins = require('./loadPlugins.js');
var config = require('../config.js');

var base = path.join(config.root.src, config.task.js.src);
var src = path.join(base, '/*.' + config.task.js.extensions);
var dest = path.join(config.root.dest, config.task.js.dest);
var exclude = path.join(base, config.task.js.src, config.task.js.entry.app.join(''));
var _src = [src, '!' + exclude];

var copyTask = function(){

    var stream = gulp.src(src)
        .pipe(plugins.changed(dest))
        .pipe(gulp.dest(dest))
        .pipe(plugins.bs.stream());

    return stream;
};
gulp.task('copy', copyTask);
gulp.task('copy:watch', ['copy'], function(){
    gulp.watch(src, ['copy']);
});