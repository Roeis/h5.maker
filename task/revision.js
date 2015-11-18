'use strict';

var gulp = require('gulp');
var path = require('path');
var plugins = require('./loadPlugins.js');
var config = require('../config.js');

var base = path.join(config.root.dest, config.task.js.dest);
var build = config.root.build;
var destJS = path.join(build, config.task.js.dest);
var src = path.join(base, '/*.' + config.task.js.extensions);

var revisionTask = function(){

    var stream = gulp.src(src)
        .pipe(plugins.rev())
        .pipe(gulp.dest(destJS))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest(build));

    return stream;
};
gulp.task('rev', revisionTask);

var manifest = gulp.src(build + '/rev-manifest.json');
var html = path.join(config.root.dest, config.task.html.dest, '/*.' + config.task.html.extensions);
var revReplaceTask = function(){
    return gulp.src(html)
        .pipe(plugins.revReplace({manifest: manifest}))
        .pipe(gulp.dest(build));
};
gulp.task('rev2', ['rev'], revReplaceTask);