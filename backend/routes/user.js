'use strict';

var passport = require('passport');
var Account = require('../model/account');


module.exports = {
    getRegister: function(req, res){
        res.render('register');
    },
    postRegister: function(req, res){
        Account.register(
            new Account({username: req.body.username}),
            req.body.password,
            function(err, account){
                if(err){
                    res.send('didnt work');
                }else{
                    // pass anthentication
                    passport.authenticate('local')(req, res, function(){
                        res.redirect('/');
                    });
                }
            }
        );
    },
    getLogin: function(req, res){
        res.render('login', {
            user: req.user
        });
    },
    postLogin: function(req, res){
        res.redirect('/');
    },
    logout: function(req, res){
        req.logout();
        res.redirect('/');
    }
};
