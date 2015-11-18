'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../model/account');

/**
 * 注册页面
 * @param  {[type]} req    [description]
 * @param  {[type]} res){                 res.render('register',{});} [description]
 * @return {[type]}        [description]
 */
router.get('/register', function(req, res){
    res.render('register',{});
});

/**
 * 注册post
 */
router.post('/register', function(req, res){
    Account.register(new Account({username: req.body.username}), 
        req.body.password, function(err, account){
            if(err){
                return res.send('didnt work');
            }
            // pass anthentication
            passport.authenticate('local')(req, res, function(){
                res.redirect('/');
            })
        });
});

/**
 * 登录
 */
router.get('/login', function(req, res){
    res.render('login', {
        user: req.user
    });
});

/**
 * 登录post
 */
router.post('/login', passport.authenticate('local'), function(req, res){
    console.log('log')
    res.redirect('/');
});

/**
 * 登出
 */
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


module.exports = router;
