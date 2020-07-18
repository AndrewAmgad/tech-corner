const mongoose = require('mongoose');
const Item = require('../item/model');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
});

const category = mongoose.model('category', CategorySchema);

module.exports = category;