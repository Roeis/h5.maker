'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

// router
var router = require('./routes/index.js');

// model
var Account = require('./model/account.js');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());


// express-session
app.use(require('express-session')({
    secret: 'secret session',
    resave: false,
    saveUninitialized: false,
    name: '_token',
    // cookie: { maxAge: 60000} // 过期时间
}));



//初始化passport
app.use(passport.initialize());
app.use(passport.session());
// Account 继承passport-local-mongoose的方法
// 使用Strategy
passport.use(new localStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());



app.use(express.static(path.join(__dirname, 'public')));
// mongoose database;
mongoose.connect('mongodb://127.0.0.1/test');
// var db = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 6001);

var port = app.get('port');

// Routes
app.use('/', router);

// 404
app.use(function(req, res, next){
  res.send('404');
});

app.listen(port, function() {
    console.log('server is on ' + port);
});
