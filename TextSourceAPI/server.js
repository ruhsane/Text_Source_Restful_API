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
//middleware to show the url is incorrect instead of a cannot get message
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

require('./api/controllers/textSourceController')(app);
require('./api/controllers/authenticationController')(app);

app.listen(port)

console.log('text source RESTful API server started on: ' + port);
