var path = require('path');

var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var os = require('os');

var app = express();
var compiler = webpack(config);
var port = 3025;

function getIp() {
    var interfaces = os.networkInterfaces();
    for (var i in interfaces) {
        for (var j in interfaces[i]) {
            var address = interfaces[i][j];
            if (address.family === 'IPv4' && !address.internal) {
                return address.address;
            }
        }
    }
}
var ip = getIp();
console.log(ip);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/root/editor/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://' + ip + ':' + port);
});
