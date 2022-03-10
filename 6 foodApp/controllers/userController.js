const userModel = require("../models/userModel");

module.exports.getUsers = async function getUsers (req, res) {
    let allUser = await userModel.find();
    // let allUser = await userModel.findOne({ name: 'Amar' });
    res.json({ message: 'list of users', data: allUser })
}

module.exports.postSignUp = async function postSignUp (req, res) {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    res.json({
        message: 'user signuped ! :)',
        data: user
    })
}

module.exports.updateUser = async function updateUser (req, res) {
    console.log('req.body: ', req.body);
    let dataTobeUpdated = req.body;
    let user = await userModel.findOneAndUpdate(
        { email: 'aman@gmail.com' }, dataTobeUpdated
    )
    res.json({
        message: 'user updated successfully ! :)'
    })
}

module.exports.deleteUser = async function deleteUser (req, res) {
    let dataToBeDelete = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDelete)
    res.json({
        message: 'user updated successfully ! :)',
        data: user
    })
}