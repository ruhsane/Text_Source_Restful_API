const User = require('../models/authModel');
const jwt = require('jsonwebtoken')

module.exports = app => {

    //SIGN UP
    app.post("/sign-up", (req, res) => {
        console.log(req.body)
        const user = new User(req.body);

        user
            .save()
            .then(user => {
                const token = jwt.sign({ _username: user._username }, process.env.SECRET, { expiresIn: "60 days" });
                res.json({'token': token});
            })
            .catch(err => {
                console.log(err.message);
                return res.status(400).send({ err:err });
            });
    });

    //LOG IN
    app.post('/login', (req, res) => {

        const username = req.body.username;
        const password = req.body.password;
    
        //find this user name
        User.findOne({ username }, "username password")
            .then(user => {
                if (!user) {
                    //user not found
                    return res.status(401).send({message: "Wrong username or password" });
                }
                //check the password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        //pasword does not match
                        return res.status(401).send({ message: "Wrong username or password" });
                    }
                    //create a token
                    const token = jwt.sign({ username: username }, process.env.SECRET, {
                        expiresIn: "60 days"
                    });
                    res.json({'token': token});

                });
            })
            .catch(err => {
                console.log(err);
            });
    })

    //protected route 
    app.get('/user/data', checkToken, (req, res) => {
        //verify the JWT token generated for the user
        jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
            if(err) {
                console.log('ERROR: cold not connect to the protected route');
                res.sendStatus(403);
            } else {
                //if token is successfully verify, send the authorized data
                res.json( {
                    message: "successful log in",
                    authorizedData
                });
                console.log('SUCCESS: connected to protected route');
            }
        })
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