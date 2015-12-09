'use strict';

module.exports = {
    index: function(req, res){
        if(!req.user){
            res.redirect('/login');
        }else{
            res.render('editor', {
                username: req.user
            });
        }
    }
};
