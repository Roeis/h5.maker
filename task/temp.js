'use strict';

var gulp = require('gulp');
var plugins = require('./loadPlugins.js');

gulp.task('slider', function(){
    gulp.src([
            'public/slider/js/adbi.slider.js',
            'public/slider/js/adbi.slider.mobile.js'
        ])
    .pipe(plugins.uglify())
    .pipe(gulp.dest('build'));

    gulp.src([
            'public/slider/css/adbi.css',
            'public/slider/css/adbi.mobile.css'
        ])
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('build'));
});