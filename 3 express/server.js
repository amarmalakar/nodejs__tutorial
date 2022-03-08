const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Server Is Listening on PORT number 3000');
});

// Passing a static HTML code
app.get('/', (req, res) => {
    res.send('<h1>Namaste Express ! :)</h1>')
})

// Passing a static HTML File
app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname })
})

// redirect an HTML File
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

// Send 404 Error Page (Always Keep At The End)
app.use((req, res) => {
    res.status(400).sendFile('./views/404Error.html', {root: __dirname});
})