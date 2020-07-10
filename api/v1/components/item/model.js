const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    images: Array,
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    details: String,
    category: String,
    price: Number,
    time: Number,
    views: Number,
});

// Model Methods
require('./model.methods')(ItemSchema);

const item = mongoose.model('item', ItemSchema);

module.exports = item;