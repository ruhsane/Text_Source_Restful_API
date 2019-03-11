const jwt = require('jsonwebtoken');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const axios = require('axios');
const TextSource = require('../models/textSourceModel');

// check to make sure header is not undefined, if so return forbidden 403, and verify jwt token
const checkToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    req.token = token;
    // VERIFY JWT TOKEN
    jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
      if (err) return res.json(err);
      req.user = authorizedData;
      next();
    });
  } else {
    // if header is undefined
    res.sendStatus(403);
  }
};


module.exports = (app) => {
  // ROOT ROUTE
  app.get('/', (req, res) => {
    res.json({ welcome: 'Welcome to my Text Source API! Start by reading my documentation here https://ruhsane.github.io/Text_Source_Restful_API/#/ ' });
  });

  // ALL TEXT FILES
  app.get('/text_sources', checkToken, (req, res) => {
    TextSource.find({}, (err, source) => {
      if (err) return res.json(err);
      res.json(source);
    });
  });

  // NEW TEXT SOURCE
  app.post('/text_sources/new', checkToken, upload.single('content'), (req, res) => {
    const new_source = new TextSource(req.body);
    const data = fs.readFileSync(req.file.path);
    new_source.content = data;
    new_source.save((err, source) => {
      if (err) return res.json(err);
      res.json(source);
    });
  });

  // READ A SOURCE
  app.get('/text_sources/:sourceId', checkToken, (req, res) => {
    TextSource.findById(req.params.sourceId, (err, source) => {
      if (err) return res.json(err);
      res.json(source);
    });
  });

  // UPDATE A SOURCE
  app.put('/text_sources/:sourceId', checkToken, (req, res) => {
    TextSource.findOneAndUpdate({ _id: req.params.sourceId }, req.body, { new: true }, (err, source) => {
      if (err) return res.json(err);
      res.json(source);
    });
  });


  // DELETE A SOURCE
  app.delete('/text_sources/:sourceId', checkToken, (req, res) => {
    TextSource.remove({ _id: req.params.sourceId }, (err, source) => {
      if (err) return res.json(err);
      res.json({ message: 'Text source successfully deleted', source });
    });
  });

  // GET MARKOV CHAIN API
  app.get('/text_sources/:sourceId/get_markov', checkToken, (req, res) => {
    // Find the text source we are about to generate sentence on
    TextSource.findById(req.params.sourceId, (err, source) => {
      if (err) return res.json(err);

      // Take in the source as the parameter to my text generator api
      axios.post('https://donald-trump-tweet-generator.herokuapp.com/api', source)
        .then((response) => {
          // get the markov chain generated sentence and send it
          res.json(response.data);
        })
        .catch((error) => {
          res.json(error);
        });
    });
  });
};
