const mongoose = require('mongoose');
const TextSource = require('../models/textSourceModel');

module.exports = app => {

    //ALL TEXT FILES
    app.get("/text_sources", (req, res) => {
        TextSource.find({}, function(err, source) {
            if (err)
                res.send(err);
            res.json(source);
        })
    });

    //NEW TEXT SOURCE
    app.post("/text_sources/new", (req, res) => {
        var new_source = new TextSource(req.body);
        new_source.save(function(err, source) {
            if (err)
                res.send(err);
            res.json(source);
        });
    });

    //READ A SOURCE
    app.get('/text_sources/:sourceId', (req, res) => {
        TextSource.findById(req.params.sourceId, function(err, source) {
          if (err)
            res.send(err);
          res.json(source);
        });
    });

     //UPDATE A SOURCE
    app.put('/text_sources/:sourceId', (req, res) => {
        TextSource.findOneAndUpdate({_id: req.params.sourceId}, req.body, {new: true}, function(err, source){
            if (err)
                res.send(err);
            res.json(source);
        });
    });

    app.delete('/text_sources/:sourceId', (req, res) => {
        TextSource.remove({
            _id: req.params.sourceId
        }, function(err, source) {
            if (err)
                res.send(err);
            res.json({ message: "Text source successfully deleted"});
        });
    });

}
