'use strict';

var express = require('express');
var router = express.Router();
var PageModel = require('../model/page.js');

/**
 * 专题接口，新增，更新，查找
 * TODO：删除（管理员权限）
 */

/**
 * 获取pageModel的列表
 * @param  {[type]} req    [description]
 * @param  {[type]} res){                 var query [description]
 * @return {[type]}        [description]
 */
router.get('/list', function(req, res){
    var query = req.query,
        size, index, startIndex;
    
    size = query ? query.pagesize : 5;
    index = query ? query.pageindex : 1;

    console.log(query);

    size = size < 0 ? 5 : size;
    index = index < 1 ? 1 : index;
    startIndex = size * index - size;
    PageModel.find()
        .limit(size)
        .skip(startIndex)
        .exec(function(err, results){
            if(err){
                res.json({
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
 * @param  {[type]} req           [description]
 * @param  {[type]} res){                        var body [description]
 * @param  {[type]} function(err, collection){                                if(err){                res.json(err);            }            if(collection.length ! [description]
 * @return {[type]}               [description]
 */
router.post('/add', function(req, res){

    var body = req.body;
    var data = JSON.parse(body.data);
    console.log(data);
    console.log(req.user);
    if(!req.user){
        res.send('u has not logged in yet');

    }else{
        PageModel.find({alias: data.alias}, function(err, collection){
            if(err){
                res.json(err);
            }
            if(collection.length !== 0){
                res.json({
                    message: 'repeated alias, please use anthor alias name',
                    cn: '中文提示：别名重复，请更换别名'
                });
            }else{
                var page = new PageModel(data);
                for(var i = 0; i < data.pages; i++){
                    page.pages.push(data.pages[i]);
                }
                // page.markModified('pages');
                page.save(function(err, data){
                    if(err){
                        res.json(err);
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
 * @param  {[type]} req           [description]
 * @param  {[type]} res){                                     var body [description]
 * @param  {[type]} function(err, collection){                                             console.log(req.user.username, collection);            if(req.user.username ! [description]
 * @param  {[type]} options.$set: {                                                                                                                                                    updateDate: Date.now(),                            isPublish: data.isPublish,                            title: data.title                        } [description]
 * @param  {[type]} function(err, collection    [description]
 * @return {[type]}               [description]
 */
router.post('/update', function(req, res){
    var body = req.body;
    var data = JSON.parse(body.data);
    if(!req.user){
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
                PageModel.update(
                    {alias: data.alias}, 
                    {
                        $set: {
                            updateDate: Date.now(),
                            isPublish: data.isPublish,
                            title: data.title
                        }
                    },
                    function(err, collection){
                    if(err){
                        res.json(err);
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
 * @param
 */
router.get('/:id', function(req, res){
    PageModel.find({
        alias: req.params.id
    }).exec();
    promise.then(
        function(result){
            if(result.length ===0){
                res.send('there is none data for >' + req.params.id);
            }
            res.json(result)
        },
        function(err){
            res.json(err);
        }
    );
});

module.exports = router;
