'use strict';
var gulp     = require('gulp');
var gutil    = require('gulp-util');
var ftp      = require('vinyl-ftp');
var config   = require('./config.js');

var deployTask = () => {

    let config = {
        
        parallel: 3,        //default: 3
        maxConnections: 5,  //default: 5 should be greater or equal to 'parallel'
        reload: false,      //default: false
    };
    // qa.res.hjfile.cn/pt
    config.log = gutil.log;

    let conn = ftp.create(config);

    let files = [
            'public/**',
            '!public/fonts/**',
            '!public/images/**'
        ];
    let targetDirectory = '/test';

    return gulp.src(files)
        .pipe(conn.newer(targetDirectory))
        .pipe(conn.dest(targetDirectory));
};

gulp.task('ftp', deployTask);

module.exports = deployTask;