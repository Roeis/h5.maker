'use strict';

var mongoose = require('mongoose');

var settingSchema = new mongoose.Schema({
    alias: {type: String, required: true},
    langs: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},

    shareImage: {type: String, required: true},
    shareTitle: {type: String, required: true},
    shareDesc: {type: String, required: true},
    content: {type: String, required: true},
    isPublish: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false},

    createUser: {type: String, required: true},
    createDate: {type: String, default: Date.now},
    updateUser: {type: String, required: true},
    updateDate: {type: String, default: Date.now}

});

var SettingModel = mongoose.model('Page', settingSchema);

module.exports = SettingModel;
