'use strict';
var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');

//===========================
/* GET edit. */
router.get('/', function(req, res) {
    if(!req.user){
        return res.redirect('/login');
    }
    res.render('editor', {
        username: req.user
    });
});


module.exports = router;
