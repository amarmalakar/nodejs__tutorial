// Server Creation

// 1 http module

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Request Has Been Made From Browser!');

    // Plain Text
    // res.setHeader('Content-Type', 'text/plain');
    // res.write('Hello Pepcoders ! :)');
    // res.end()

    // HTML
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Hello Pepcoders ! :)</h1>');
    res.end()
})

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on PORT 3000');
})