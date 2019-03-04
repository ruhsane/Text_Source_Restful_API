const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    mongoose = require('mongoose'),
    TextSource = require('./api/models/TextSourceModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Textsourcedb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/textSourceRoutes');
routes(app);

app.listen(port)

console.log('text source RESTful API server started on: ' + port);
