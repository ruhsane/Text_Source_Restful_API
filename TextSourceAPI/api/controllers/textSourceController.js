const mongoose = require('mongoose'),
    TextSource = mongoose.model(Text_Source);

exports.list_all_sources = function(req, res) {
    TextSource.find({}, function(err, source) {
        if (err)
            res.send(err);
        res.json(source);
    });
};

exports.create_a_source = function(req, res) {
    var new_source = new TextSource(req.body);
    new_source.save(function(err, source) {
        if (err)
            res.send(err);
        res.json(source);
    });
};

exports.update_a_source = function(req, res) {
    TextSource.findOneAndUpdate({_id: req.params.sourceId}, req.body, {new: true}, function(err, source){
        if (err)
            res.send(err);
        res.json(source);
    });
};

exports.delete_a_source = function(req, res) {
    TextSource.remove({
        _id: req.params.sourceId
    }, function(err, source) {
        if err(err)
            res.send(err);
        res.json({ message: "Text source successfully deleted"});
    });
};
