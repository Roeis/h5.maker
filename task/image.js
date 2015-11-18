'use strict';

var gulp = require('gulp');
var path = require('path');
var plugins = require('./loadPlugins.js');
var config = require('../config.js');

var base = path.join(config.root.src, config.task.image.src);
var src = path.join(base, '/*.{' + config.task.image.extensions + '}');
var dest = path.join(config.root.dest, config.task.image.dest);

var imageTask = function(env){
   
    var stream = gulp.src(src)
        .pipe(plugins.changed(dest))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(dest))
        .pipe(plugins.bs.stream());

    return stream;

};
gulp.task('image', imageTask);
gulp.task('image:watch', ['image'], function(){
    gulp.watch(src, ['image']);
});