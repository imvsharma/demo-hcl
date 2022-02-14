const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    notes: [{type: Schema.Types.ObjectId, ref: 'Note' }],
}, {timestamps: true});

module.exports = mongoose.model('User', schema);