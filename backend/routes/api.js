'use strict';

var express = require('express');
var router = express.Router();
var PageModel = require('../model/page.js');
var TemplateModel = require('../model/template.js');

/**
 * 专题接口，新增，更新，查找
 * TODO：删除（管理员权限）
 */

/**
 * 获取pageModel的列表
 */
router.get('/list', function(req, res){
    var query = req.query,
        size, index, startIndex;

    size = query ? query.pageSize : 5;
    index = query ? query.pageIndex : 1;

    console.log(query);

    size = size < 0 ? 5 : size;
    index = index < 1 ? 1 : index;
    startIndex = size * index - size;
    PageModel.find()
        .limit(size)
        .skip(startIndex)
        .exec(function(err, results){
            if(err){
                return res.json({
                    Code: -1,
                    Message: 'err',
                    data: err
                });
            }
            PageModel.count()
                .exec(function(err, count){
                    var pages = Math.ceil(count/size);
                    res.json({
                        Code: 0,
                        Message: 'ok',
                        data: {
                            list: results,
                            total: count,
                            pages: pages
                        }
                    })
                });
        })
});


/**
 * 新增专题，创建一条记录
 */
router.post('/add', function(req, res){

    var body = req.body;
    var data = JSON.parse(body.data);
    console.log(data);
    console.log(req.user);
    if(!!req.user){
        res.send('u has not logged in yet');

    }else{
        PageModel.find({alias: data.alias, langs: data.langs}, function(err, collection){
            if(err){
                return res.json(err);
            }
            if(collection.length !== 0){
                res.json({
                    message: 'repeated alias, please use anthor alias name',
                    cn: '中文提示：别名重复，请更换别名'
                });
            }else{
                var page = new PageModel(data);
                page.createUser = req.user.username;
                page.updateUser = req.user.username;

                // for(var i = 0; i < data.pages; i++){
                //     page.pages.push(data.pages[i]);
                // }
                // page.markModified('pages');
                page.save(function(err, data){
                    if(err){
                        return res.json(err);
                    }
                    res.json(data);
                });
            }
            console.log(collection);
        });
    }
});

/**
 * 更新专题数据
 */
router.post('/update', function(req, res){
    var body = req.body;
    var data = JSON.parse(body.data);
    if(!!req.user){
        res.send('u has not logged in yet');
    }else{
        // 先找到数据，判断是否登录用户是否为有权限的用户
        PageModel.find({alias: data.alias}, function(err, collection){
            console.log(req.user.username, collection);
            if(req.user.username !== collection[0].createUser){
                res.json({
                    message: 'sorry u have not the access to edit this page'
                })
            }else{
                // 数据库更新详细的数据变更
                console.log(data);

                PageModel.update(
                    {alias: data.alias},
                    {
                        $set: {
                            updateDate: Date.now(),
                            isPublish: data.isPublish,
                            title: data.title,
                            content: data.content,
                            langs: data.langs
                        }
                    },
                    function(err, collection){
                    if(err){
                        return res.json(err);
                    }
                    res.json({
                        message: 'update ok'
                    });

                })
            }
        });
    }});


/**
 * 获取单个专题数据
 */
router.get('/get', function(req, res){

    if(!req.query.id){
        res.json({
            Code: -1,
            Message: 'please add query'
        });
        return;
    }

    var promise = PageModel.find({
        _id: req.query.id
    }).exec();

    promise.then(
        function(result){
            if(result.length ===0){
                return res.send('there is none data for >' + req.params.id);
            }
            res.json({
                Code: 0,
                Message: 'ok',
                data: result[0].content
            });
        },
        function(err){
            res.json(err);
        }
    );
});






/**
 * 新增模板， 往templates中添加数据
 */
router.post('/template/add', function(req, res){

    var body = req.body,
        data = JSON.parse(body.data);

    data = JSON.parse(data.data);

    console.log('data', data);
    console.log(req.user);
    if(!!req.user){
        res.send('u has not logged in yet');
    }else{
        var template = new TemplateModel(data);
        template.save(function(err, data){
            if(err){
                res.json(err);
            }
            res.json(data);
        });
    }
});

/**
 * 魔板列表接口， pageindex, pagesize
 */
router.get('/template/list', function(req, res){
    var query = req.query,
        size, index, startIndex;

    size = query ? query.pageSize : 5;
    index = query ? query.pageIndex : 1;

    console.log(query);

    size = size < 0 ? 5 : size;
    index = index < 1 ? 1 : index;
    startIndex = size * index - size;
    TemplateModel.find()
        .limit(size)
        .skip(startIndex)
        .exec(function(err, results){
            if(err){
                return res.json({
                    Code: -1,
                    Message: 'err',
                    data: err
                });
            }
            TemplateModel.count()
                .exec(function(err, count){
                    var pages = Math.ceil(count/size);
                    res.json({
                        Code: 0,
                        Message: 'ok',
                        data: {
                            list: results,
                            total: count,
                            pages: pages
                        }
                    })
                });
        })
});

module.exports = router;
