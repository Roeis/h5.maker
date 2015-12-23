'use strict';

var PageModel = require('../model/page.js');

module.exports = {
    getPage: function(req, res){
        PageModel
            .find({
                langs: req.params.langs,
                alias: req.params.alias
            })
            .exec()
            .then(
                function(result){
                    if(result.length === 0){
                        res.send('has no page');
                    }else{
                        var it = result[0],
                            content = JSON.parse(it.content),
                            data = {
                                output: content.output,
                                setting: content.setting,
                                shareDesc: it.shareDesc,
                                shareTitle: it.shareTitle,
                                shareImage: it.shareImage,
                                description: it.description,
                                title: it.title,
                                createUser: it.createUser
                            };
                        res.render('h5', data);
                    }
                },
                function(err){
                    res.send(err);
                }
            )
    }
};
