const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String, default: 'Manh Tuong', maxLength: 255, require: true},
    description: String,
    videoId: {type: String, require: true},
    image: String,
    slug: {type: String, slug: 'name', unique: true}
}, {
    timestamps: true,
});

//add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete,  { 
    deletedAt : true,
    overrideMethods: 'all' 
});


module.exports = mongoose.model('Course', Course);