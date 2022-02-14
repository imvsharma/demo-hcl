const mongoose = require('mongoose');
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
console.log(process.env.CONNECTION_STRING)
mongoose.connect( process.env.CONNECTION_STRING, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../app/users/user.model'),
    Note: require('../app/notes/notes.model')
};