const mongoose = require('mongoose');
const TextSource = require('../models/textSourceModel');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const upload = multer({ dest: "uploads/"});
const fs = require("fs")

module.exports = app => {

    //ALL TEXT FILES
    app.get("/text_sources", checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            if(err) {
                console.log(err)
                console.log('ERROR: cold not connect to the protected route');
                res.sendStatus(403);
            } else {
                //if token is successfully verify, send the authorized data
                TextSource.find({}, function(err, source) {
                    if (err)
                        res.send(err);
                    res.json(source);
                });
                console.log('SUCCESS: connected to protected route');
            }
        })
    });

    //NEW TEXT SOURCE
    app.post("/text_sources/new", checkToken, upload.single("content"), (req, res) => {
        console.log(req.file)
        //verify the JWT token generated for the user
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            if(err) {
                console.log('ERROR: cold not connect to the protected route');
                res.sendStatus(403);
            } else {
                //if token is successfully verify, send the authorized data
                var new_source = new TextSource(req.body);
                const data = fs.readFileSync(req.file.path)
                new_source.content = data
                new_source.save(function(err, source) {
                    if (err)
                        res.send(err);
                    res.json(source);
                });
                console.log('SUCCESS: connected to protected route');
            }
        })
    });

    //READ A SOURCE
    app.get('/text_sources/:sourceId', checkToken, (req, res) => {

        //verify the JWT token generated for the user
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            if(err) {
                console.log('ERROR: cold not connect to the protected route');
                res.sendStatus(403);
            } else {
                //if token is successfully verify, send the authorized data
                TextSource.findById(req.params.sourceId, function(err, source) {
                    if (err)
                      res.send(err);
                    res.json(source);
                });
                console.log('SUCCESS: connected to protected route');
            }
        });

    });

     //UPDATE A SOURCE
    app.put('/text_sources/:sourceId', checkToken, (req, res) => {

        //verify the JWT token generated for the user
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            if(err) {
                console.log('ERROR: cold not connect to the protected route');
                res.sendStatus(403);
            } else {
                //if token is successfully verify, send the authorized data
        
                TextSource.findOneAndUpdate({_id: req.params.sourceId}, req.body, {new: true}, function(err, source){
                    if (err)
                        res.send(err);
                    res.json(source);
            
                });
                console.log('SUCCESS: connected to protected route');
            }
        });

    });

    app.delete('/text_sources/:sourceId', checkToken, (req, res) => {

        //verify the JWT token generated for the user
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            if(err) {
                console.log('ERROR: cold not connect to the protected route');
                res.sendStatus(403);
            } else {
                //if token is successfully verify, send the authorized data
            
                TextSource.remove({
                    _id: req.params.sourceId
                }, function(err, source) {
                    if (err)
                        res.send(err);
                    res.json({ message: "Text source successfully deleted"});                
                });
                console.log('SUCCESS: connected to protected route');
            }
        });
    });

}


//check to make sure header is not undefined, if so return forbidden 403
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //if header is undefined
        res.sendStatus(403)
    }
}