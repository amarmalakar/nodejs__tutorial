const mongoose = require('mongoose');
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const { db_link } = require("../secret_key")

// Connecting With DataBase With mongoose
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
userSchema.pre('save', async function () {
    this.confirmPassword = undefined;
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    console.log(hashedPassword);
})

// model
const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;