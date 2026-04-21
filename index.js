const http = require('http'); // 1. Module ko bulaya

// 2. Server banaya
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'}); // Sab sahi hai (Status 200)
  res.end('Himanshu Dubey, your server is Live!'); // Browser ko jawab bheja
});

// 3. Server ko ek "Port" par bithaya
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});