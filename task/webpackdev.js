'use strict';

var gulp = require('gulp');
var path = require('path');
var plugins = require('./loadPlugins.js');
var config = require('../config.js');
var webpack = require('webpack');

// Attention: path.resolve
var src = path.resolve(config.root.src, config.task.js.src);
var dest = path.resolve(config.root.dest, config.task.js.dest);

var configWebpack = function(env){

    var flag = env === 'production';
    var filenamePattern = flag ? '[name]-[hash].js' : '[name].js';
    // 
    var webpackConfig = {
        module: {
            loaders:[
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            root: src
        },
        plugins: []
    };

    webpackConfig.output = {
        path: dest,
        filename: filenamePattern
    };

    webpackConfig.entry = config.task.js.entry;

    webpackConfig.plugins.push(
        new webpack.optimize.DedupePlugin()
    );

    if(!flag){
        webpackConfig.devtool = 'source-map';
        //eval, source-map, hidden-source-map, inline-source-map, eval-source-map
        webpackConfig.debug = true;
    }

    
    // new webpack.NoErrorsPlugin()
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: { warnings: false }
    // }),

    return webpackConfig;
};

gulp.task('webpack:watch', function(){
    webpack(configWebpack('dev')).watch(200, function(err, stats){
        // logger(err, stats);
        if(err) throw new plugins.util.PluginError('webpack', err);
        plugins.util.log('webpack', stats.toString({
            colors: true
        }));
        plugins.bs.reload();
    });
});