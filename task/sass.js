'use strict';

var gulp = require('gulp');
var path = require('path');
var plugins = require('./loadPlugins.js');
var config = require('../config.js');

var base = path.join(config.root.src, config.task.sass.src),
    src = path.join(base, '/*.{' + config.task.sass.extensions + '}'),
    dest = path.join(config.root.dest, config.task.sass.dest);
var sassTask = function(){

    var stream = gulp.src(src)
        .pipe(plugins.changed(dest))
        .pipe(plugins.compass({
            style: 'expanded',                  //nested, expanded, compact, compressed
            css: dest,
            sass: base,
        }))
        .on('error', function(err){
            console.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: ['> 5%'],
        }))
        .pipe(gulp.dest(dest))
        .pipe(plugins.bs.stream());

    return stream;

};

gulp.task('compass', sassTask);
gulp.task('compass:watch', ['compass'], function(){
    gulp.watch(src, ['compass']);
});