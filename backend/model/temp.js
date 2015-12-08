var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({

    id: { type: String },
    data : {},
    createDate: { type: String, default: Date.now, required: true }

});

var TemplateModel = mongoose.model('Template', pageSchema);

module.exports = TemplateModel;
