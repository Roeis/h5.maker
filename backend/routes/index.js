'use strict';
var express = require('express');
var router = express.Router();
// var redis = require('redis');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//===========================
/* GET home page. */
router.get('/', function(req, res, next) {

    console.log('user', req.user);
    if(!req.user){
        return res.redirect('/login');
    }
    res.render('index', {
        username: req.user ? req.user : '0'
    });
});


module.exports = router;
