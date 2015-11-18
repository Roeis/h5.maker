var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
    id: {type: String, required: true},
    alias: {type: String, required: true},
    langs: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},

    templateType: {type: String, required: true},

    shareImage: {type: String, required: true},
    shareTitle: {type: String, required: true},
    shareDesc: {type: String, required: true},

    isPublish: {type: Boolean, required: true},
    isDeleted: {type: Boolean, required: true},

    createUser: {type: String, required: true},
    createDate: {type: String, default: Date.now, required: true},
    updateUser: {type: String, required: true},
    updateDate: {type: String, default: Date.now, required: true}

});

var PageModel = mongoose.model('Page', pageSchema);

module.exports = PageModel;