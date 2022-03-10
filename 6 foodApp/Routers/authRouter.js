const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {jwt_token} = require('../secret_key.js');
const authRouter = express.Router();

authRouter
    .route('/login')
    .post(loginUser);

async function loginUser (req, res) {
    try {
        // let data = req.body;
        let {email, password} = req.body;
        if (!email || !password) {
            return res.json({ "message": "Please Fill Credentials" })
        }
        let user = await userModel.findOne({ email });
        if (user) {
            if (user.password == password) {
                // res.cookie('isLoggedIn', true, {httpOnly: true});
                let unique_id = user['_id']; // uid
                let json_web_token = jwt.sign(
                    { payload: unique_id },
                    jwt_token
                )
                res.cookie('login', json_web_token, {httpOnly: true});
                return res.json({ message: 'User LoggedIn', userDetails: {email, password} })
            } else {
                return res.json({ message: 'Wrong Credentials ! :(' })
            }
        } else {
            return res.json({ message: 'User not found! :(' })
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: error.message })
    }
}

module.exports = authRouter;