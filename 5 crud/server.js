const express = require('express');
const mongoose = require('mongoose');
const validator = require("email-validator");
const app = express()

app.use(express.json())

app.listen(3000, () => {
    console.log('App Listen on PORT number 3000');
})

const userRouter = express.Router();
app.use('/user', userRouter);

userRouter
    .route('/')
    .get(getUsers)
    .post(postSignUp)
    .patch(updateUser)
    .delete(deleteUser);

async function getUsers (req, res) {
    let allUser = await userModel.find();
    // let allUser = await userModel.findOne({ name: 'Amar' });
    res.json({ message: 'list of users', data: allUser })
}

async function postSignUp (req, res) {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    res.json({
        message: 'user signuped ! :)',
        data: user
    })
}

async function updateUser (req, res) {
    console.log('req.body: ', req.body);
    let dataTobeUpdated = req.body;
    let user = await userModel.findOneAndUpdate(
        { email: 'aman@gmail.com' }, dataTobeUpdated
    )
    res.json({
        message: 'user updated successfully ! :)'
    })
}

async function deleteUser (req, res) {
    let dataToBeDelete = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDelete)
    res.json({
        message: 'user updated successfully ! :)',
        data: user
    })
}

// Connecting With DataBase With mongoose
const db_link = "mongodb+srv://admin:qAeaVAQasBB0Zn6R@cluster0.9aily.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then((db) => {
    console.log('Server is connected with db');
})
.catch((err) => {
    console.log(err);
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return validator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function () {
            return this.confirmPassword === this.password
        }
    }
})

// Adding Mongoose hook to remove confirmPassword before save
userSchema.pre('save', function () {
    console.log('before saving in db');
    this.confirmPassword = undefined;
})
userSchema.post('save', function () {
    console.log('adter saving in db');
})

// model
const userModel = mongoose.model('userModel', userSchema);

// (async function createUser () {
//     let user = {
//         name: 'Aryan',
//         email: 'aryan@gmail.com',
//         password: '12345678',
//         confirmPassword: '12345678'
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();

// {
//     "name": "Aman",
//     "email": "aman@gmail.com",
//     "password": "12345678",
//     "confirmPassword": "12345678"
// }