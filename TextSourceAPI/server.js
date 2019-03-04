const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    mongoose = require('mongoose'),
    TextSource = require('./api/models/textSourceModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Textsourcedb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./api/controllers/textSourceController.js')(app);

app.listen(port)

console.log('text source RESTful API server started on: ' + port);
