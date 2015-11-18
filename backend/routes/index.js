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
        res.redirect('/login');
    }
    res.render('index', {
        user: req.user
    });
});


module.exports = router;
