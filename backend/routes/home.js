'use strict';

module.exports = {
    index: function(req, res) {
        console.log('user', req.user);
        if(!req.user){
            res.redirect('/login');
        }else{
            res.render('index', {
                username: req.user.username ? req.user.username : '0'
            });
        }
    }
};
