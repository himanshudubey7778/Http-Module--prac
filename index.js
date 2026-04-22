const http = require('http');
const fs = require('fs'); // Files read karne ke liye

const server = http.createServer((req, res) => {
    // HTML file ko read karo
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('File Not Found!');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data); // HTML ka data browser ko bhejo
        }
        res.end();
    });
});

server.listen(3000, () => {
    console.log('Tejjora Server: http://localhost:3000 server live is');
});