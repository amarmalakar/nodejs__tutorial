const express = require('express');
const protectRoute = require("./authHelper");
const { getUsers, postSignUp, updateUser, deleteUser } = require("../controllers/userController")

const userRouter = express.Router();

userRouter
    .route('/')
    .get(getUsers)
    .post(postSignUp)
    .patch(updateUser)
    .delete(deleteUser);

userRouter
    .route('/auth')
    .get(protectRoute);

module.exports = userRouter;