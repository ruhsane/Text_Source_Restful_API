const mongoose = require('mongoose');
const User = require('../models/authModel');
const jwt = require('jsonwebtoken')

module.exports = app => {

    //NEW USER
    app.post("/sign-up", (req, res) => {
        const newUser = new User(req.body);
        newUser.save(function (err) {
            if (err) console.log(err);
            // saved!
            const token = jwt.sign({ _id: user._id }, 'shhhhhhared-secret');
            console.log(token)
        });
    });


}