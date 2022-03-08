const express = require('express');
const app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log('Server Is Listening on PORT number 3000');
});

const authRouter = express.Router()

app.use('/auth', authRouter);

authRouter
    .route('/signup')
    .get(getSignUp)
    .post(postSignUp);

function getSignUp (req, res) {
    res.sendFile('/public/signup.html', { root: __dirname })
}

function postSignUp (req, res) {
    let obj = req.body;
    console.log('backend: ', obj);
    res.json({
        message: "user signuped",
        data: obj,
    })
}