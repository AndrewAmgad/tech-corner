const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../category/model');


const ItemSchema = new Schema({
    images: Array,
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    title: String,
    details: String,
    price: Number,
    time: Number,
    views: Number,
});

// Model Methods
require('./model.methods')(ItemSchema);

const item = mongoose.model('item', ItemSchema);

module.exports = item;