const dotenv = require('dotenv');
// get config vars
dotenv.config();
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//const jwt = require('helpers/jwt');
const errorHandler = require('helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use('/users', require('./app/users/user.controller'));
app.use('/notes', require('./app/notes/notes.routes'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});