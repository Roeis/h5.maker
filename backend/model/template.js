var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({

    author: {type: String, required: true},
    name: {type: String, required: true},
    pic: {type: String, required: true},
    src: {},
    isPassed: {type: Boolean},
    isDeleted: {type: Boolean},

    createDate: {type: String, default: Date.now, required: true}

});

var TemplateModel = mongoose.model('Template', pageSchema);

module.exports = TemplateModel;
