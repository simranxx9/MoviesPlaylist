//Helper functions for JWT management

const jwt = require('jsonwebtoken');

//Verify JWT Token
module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    console.log('Inside jwtHelper', req.headers);
    if ('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];
        console.log('Found token in jwtHelper', token)
    }
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided' });

    }
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication unsuccessful' });
                else {

                    req._userName = decoded.id;
                    console.log('second if', req._userName);
                    next();
                }
            }
        )
    }
}