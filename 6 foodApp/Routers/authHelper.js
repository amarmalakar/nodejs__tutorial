const jwt = require("jsonwebtoken");
const jwt_token = require('../secret_key.js');

async function protectRoute (req, res, next) {
    if (req.cookies.login) {
        // return res.json({
        //     message: 'user logged in'
        // })
        let isVerified = jwt.verify(req.cookies.login, jwt_token);
        if (isVerified) {
            next();
        } else {
            return res.json({
                message: 'User not verified :('
            })
        }
    } else {
        return res.json({
            message: 'Please Loggin! Operations not allowed :('
        })
    }
}

module.exports = protectRoute;