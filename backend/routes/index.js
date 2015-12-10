'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');

var home = require('./home.js');
var user = require('./user.js');
var api  = require('./api.js');
var edit = require('./edit.js');

// 首页
router.get('/', home.index);
router.get('/add', home.add);

// 用户登录注册
router.get('/register', user.getRegister);
router.post('/register', user.postRegister);
router.get('/login', user.getLogin);
router.post('/login', passport.authenticate('local'), user.postLogin);
router.get('/logout', user.logout);

// 接口
router.get('/api/list', api.getPageList);
router.post('/api/add', api.addPage);
router.post('/api/update', api.updatePage);
router.get('/api/get', api.getPage);

router.post('/api/template/add', api.addTemplate);
router.get('/api/template/list', api.getTemplateList);

// 编辑页面
router.get('/edit', edit.index);

module.exports = router;
