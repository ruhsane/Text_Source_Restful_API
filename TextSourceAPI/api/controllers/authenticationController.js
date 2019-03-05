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
    app.post('/login', (req, res, next) => {
        const { body } = req;
        const { username }= body;
        const { password } = body;

        if (username === User.username && password === User.password) {
            jwt.sign({ _username: User._username }, process.env.SECRET, (err, token) => {
                if(err) { console.log(err) }
                res.send(token);
            });
        } else {
            console.log('ERROR: could not log in')
        }
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