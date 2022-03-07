const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log('Server Is Intrecting With Browser');

    res.setHeader('Content-Type', 'text/html');
    path = './views'
    switch (req.url) {
        case '/':
            path += '/index.html'
            res.statusCode=200;
            break;
        case '/about':
            path += '/about.html'
            res.statusCode=200;
            break;
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        case '/contact':
            path += '/contact.html'
            res.statusCode=200;
            break;
        default:
            path += '/error.html'
            res.statusCode=400;
            break;
    }

    fs.readFile(path, (err, fileData) => {
        if (err) {
            console.log(err);
        } else {
            // res.write(fileData);
            res.end(fileData);
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('SERVER IS LISTEN ON PORT 3000');
})