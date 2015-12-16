'use strict';

var screenshot = require('url-to-screenshot');
var fs = require('fs');
var path = require('path');

// screenshot('http://172.16.12.225:6001/login')
//     .width(300)
//     .height(300)
//     .clip()
//     .capture(function(err, img) {
//         if (err) {
//             console.log(err);
//         }else{
//             var output = path.resolve(__dirname, '../public/images/templates');
//             fs.writeFileSync(output + '/example.png', img);
//             console.log('open example.png');
//         }
//   });

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
    },
    add: function(req, res){
        if(!req.user){
            res.redirect('/login');
        }else{
            res.render('add');
        }
    }
};
