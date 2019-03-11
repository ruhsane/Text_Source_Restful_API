const jwt = require('jsonwebtoken');
const User = require('../models/authModel');

module.exports = (app) => {
  // SIGN UP
  app.post('/sign-up', (req, res) => {
    const user = new User(req.body);

    user
      .save()
      .then((user) => {
        const token = jwt.sign({ _username: user._username }, process.env.SECRET);
        res.json({ token });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(400).send({ err });
      });
  });

  // LOG IN
  app.post('/login', (req, res) => {
    const { username } = req.body;
    const { password } = req.body;

    // find this user name
    User.findOne({ username }, 'username password')
      .then((user) => {
        if (!user) {
          // user not found
          return res.status(401).send({ message: 'Wrong username or password' });
        }
        // check the password
        user.comparePassword(password, (err, isMatch) => {
          if (!isMatch) {
            // pasword does not match
            return res.status(401).send({ message: 'Wrong username or password' });
          }
          // create a token
          const token = jwt.sign({ username }, process.env.SECRET);
          res.json({ token });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
