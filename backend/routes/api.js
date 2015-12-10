'use strict';

var PageModel = require('../model/page.js');
var TemplateModel = require('../model/template.js');

var core = {
    filterPageData: function(data){
        var updateKeys = [
                'langs',
                'title',
                'description',
                'shareImage',
                'shareTitle',
                'shareDesc',
                'content',
                'isPublish',
                'isDeleted',
            ],
            editData = {};

        for(var i = 0; i < updateKeys.length; i++){
            var key = updateKeys[i];
            if(data[key]){
                editData[key] = data[key];
            }
        }

        return editData;
    },
    handleError: function(res, err){
        res.json({
            Code: -2,
            Message: 'error',
            data: err
        });
    }
};
/**
 * 获取pageModel的列表
 */
module.exports = {
    getPageList: function(req, res){

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
                    core.handleError(res, err);
                }else{
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
                }
            });
    },
    addPage: function(req, res){
        var body = req.body,
            data = JSON.parse(body.data);
        console.log(data);
        console.log(req.user);
        if(!req.user){
            res.send('u has not logged in yet');

        }else{
            PageModel
                .find({alias: data.alias, langs: data.langs})
                .exec()
                .then(
                    function(collection){

                        if(collection.length !== 0){
                            res.json({
                                Code: -2,
                                Message: 'repeated alias, please use anthor alias name',
                                data: '中文提示：别名重复，请更换别名'
                            });
                        }else{
                            var page = new PageModel(data);

                            page.createUser = req.user.username;
                            page.updateUser = req.user.username;

                            // page.markModified('pages');
                            page.save(function(err, data){
                                var out =  {
                                    Code: err ? -2 : 0,
                                    Message: err ? 'error' : 'Add Page OK',
                                    data: err ? err : data
                                }
                                res.json(out);
                            });
                        }
                    },
                    function(err){
                        core.handleError(res, err);
                    }
                );
        }
    },
    updateSetting: function(req, res){
        
    },
    updatePage: function(req, res){
        var body = req.body,
            data = JSON.parse(body.data);

        console.log('update', data);
        if(!req.user){
            res.json({
                Code: -1,
                Message: 'u has not logged in yet',
                data: null
            });
        }else{
            // 先找到数据，判断是否登录用户是否为有权限的用户
            PageModel.find({_id: data.id}, function(err, collection){
                console.log(req.user.username, collection);
                if(req.user.username !== collection[0].createUser){
                    res.json({
                        Code: -2,
                        Message: 'sorry u have not the access to edit this page',
                        data: null
                    });
                }else{
                    // 数据库更新详细的数据变更
                    console.log(data);
                    var editData = core.filterPageData(data);
                    editData.updateUser = req.user.username;
                    editData.updateDate = Date.now();

                    PageModel.update(
                        {_id: data.id},
                        {$set: editData},
                        function(err, collection){
                            var out = {
                                Code: err ? -2 : 0,
                                Message: err ? 'error' : 'update successfully',
                                data: err ? err : collection
                            }
                            res.json(out);
                        });
                }
            });
        }
    },


    getPage: function(req, res){

        if(!req.query.id){
            res.json({
                Code: -2,
                Message: 'please add query',
                data: null
            });
        }

        PageModel
            .find({_id: req.query.id})
            .exec()
            .then(
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
                    core.handleError(res, err);
                }
            );
    },

    addTemplate: function(req, res){
        var body = req.body,
            data = JSON.parse(body.data);

        //jsonParse again
        data = JSON.parse(data.data);

        console.log('data', data);

        if(!req.user){
            res.json({
                Code: -1,
                Message: 'u has not logged in yet',
                data: null
            });
        }else{
            var template = new TemplateModel(data);
            template.save(function(err, data){
                var out = {
                        Code: err ? -2 : 0,
                        Message: err ? 'error' : 'add ok',
                        data: err ? null: data
                    };
                res.json(out);
            });
        }
    },

    getTemplateList: function(req, res){
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
                    core.handleError(res, err);
                }else{
                    TemplateModel
                        .count()
                        .exec(function(err, count){
                            var pages = Math.ceil(count / size);
                            res.json({
                                Code: 0,
                                Message: 'ok',
                                data: {
                                    list: results,
                                    total: count,
                                    pages: pages
                                }
                            });
                        });
                }
            });
    }

};
