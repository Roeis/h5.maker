'use strict';

var gulp = require('gulp');
var plugins = require('./loadPlugins.js');
var config = require('../config.js');

//be aware: The glob pattern ** matches all children and the parent.
var base = config.root.dest;
// var build = config.root.build;
var src = [base + '/**', '!' + base, '!'+ base +'/vendor/**'];
// var srcBuild = [build + '/**', '!' + build, '!'+ build +'/vendor/**'];

var clean = () => {
    plugins.del(src).then(paths => {
        console.log(paths);
    });
};

gulp.task('clean', clean);