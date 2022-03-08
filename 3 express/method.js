const express = require('express');
const app = express();

// middleware function -> post, front->json
app.use(express.json())

app.listen(3000, () => {
    console.log('Server Is Listening on PORT number 3000');
});

let users = [
    { id: 1, name: 'Amar' },
    { id: 2, name: 'Aryan' },
    { id: 3, name: 'ASUS' },
    { id: 4, name: 'ABC' },
];

// get method -> to GET data from server
app.get('/users', (req, res) => {
    res.send(users)
})

// post method -> to POST data on the server
app.post('/users', (req, res) => {
    users = req.body.Name;
    console.log(req.body, users);
    res.json({
        message: 'data recived successfully',
        user: req.body
    })
})

// patch method -> for update method
app.patch('/user', (req, res) => {
    console.log('req.body -> ', req.body);
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "Data Updated SuccessFully"
    })
})

// delete method -> to delete data
app.delete('/users', (req, res) => {
    users = {},
    res.json({
        message: "data has been deleted"
    })
})

// params
app.get('/user/:id', (req, res) => {
    console.log(req.params.id);
    res.send('user id is recived');
})