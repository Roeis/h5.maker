'use strict';
// load all plugins
var loadPlugins = require('gulp-load-plugins');
var plugins = loadPlugins({
    rename: {
        'gulp-nunjucks-render': 'nunjucksRender',
        'gulp-if': 'gulpif'
    }
});
    // DEBUG: false, // when set to true, the plugin will log info to console. Useful for bug reporting and issue debugging
    // pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
    // config: 'package.json', // where to find the plugins, by default searched up from process.cwd()
    // scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within
    // replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
    // camelize: true, // if true, transforms hyphenated plugins names to camel case
    // lazy: true, // whether the plugins should be lazy loaded on demand
    // rename: {}, // a mapping of plugins to rename
    // renameFn: function (name) { ... } // a function to handle the renaming of plugins (the default works)
    
plugins.del = require('del');
plugins.webpack = require('webpack');
plugins.bs = require('browser-sync');

module.exports = plugins;