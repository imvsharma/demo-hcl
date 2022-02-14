const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, unique: false, required: true },
    content: { type: String, unique: false, required: true }
}, {timestamps: true});


module.exports = mongoose.model('Note', schema);