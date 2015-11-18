'use strict';
import gulp from 'gulp';
import path from 'path';
import iconfont from 'gulp-iconfont';
import generateIconSass from './generateIconSass.js';
import handleErrors from '../biz/errorHandler.js';
import config from '../config.js';



var fontPath = path.join(config.root.dest, config.tasks.iconFont.dest);
var cssPath = path.join(config.root.dest, config.tasks.sass.dest);

var settings = {
    name: 'gulp icons',
    src: path.join(config.root.src, config.tasks.iconFont.src, '/*.svg'),
    dest: path.join(config.root.dest, config.tasks.iconFont.dest),
    sassDest: path.join(config.root.src, config.tasks.sass.src, config.tasks.iconFont.sassDest),
    template: path.normalize('./task/iconFont/template.sass'),
    sassOutputName: '_icons.sass',
    fontPath: path.relative(cssPath, fontPath),
    className: 'icon',
    options: {
        svg: true,
        timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
        fontName: 'icons',
        appendUnicode: true,
        normalize: false,
        formats: config.tasks.iconFont.extensions
    }
};

var iconFontTask = function() {
    return gulp.src(settings.src)
        .pipe(iconfont(settings.options))
        .on('glyphs', generateIconSass(settings))
        .on('error', handleErrors)
        .pipe(gulp.dest(settings.dest));
};

gulp.task('iconFont', iconFontTask);
module.exports = iconFontTask;
