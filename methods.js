const http = require("http");

// Mock Database (Users Array)
const users = [
    { id: 1, name: "himanshu" },
    { id: 2, name: "Aman" }
];
let nextId = 3;

const server = http.createServer((req, res) => {
    // Browser ko batate hain ki hum JSON bhej rahe hain
    res.setHeader("Content-Type", "application/json");

    // URL Parsing (Jaise tumhare VS Code mein tha)
    const parsed = new URL(req.url, "http://localhost:3000");
    const pathname = parsed.pathname;
    const part = pathname.split("/"); // [' ', 'users', '1']

    const method = req.method;
    const id = part[2] ? parseInt(part[2]) : null;

    // --- LOGIC START ---

    if (part[1] === "users") {
        
        // 1. GET ALL or GET BY ID
        if (method === "GET") {
            if (id) {
                const user = users.find(u => u.id === id);
                if (user) {
                    res.writeHead(200);
                    res.end(JSON.stringify(user));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ message: "User is not find!" }));
                }
            } else {
                res.writeHead(200);
                res.end(JSON.stringify(users));
            }
        }

        // 2. POST (Naya User Add Karna)
        // --- POST Wale Section Mein Ye Change Karo ---
else if (method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", () => {
        try {
            // Agar body khali hai toh error handle karo
            if (!body) {
                res.writeHead(400);
                return res.end(JSON.stringify({ message: "can u please body inside data!" }));
            }

            const { name } = JSON.parse(body);
            const newUser = { id: nextId++, name };
            users.push(newUser);
            res.writeHead(201);
            res.end(JSON.stringify(newUser));
        } catch (error) {
            // Agar JSON format galat hai toh yahan pakda jayega
            res.writeHead(400);
            res.end(JSON.stringify({ message: "Invalid JSON format!" }));
        }
    });
}

        // 3. PUT (Data Update Karna)
        else if (method === "PUT" && id) {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                const index = users.findIndex(u => u.id === id);
                if (index !== -1) {
                    const { name } = JSON.parse(body);
                    users[index].name = name;
                    res.writeHead(200);
                    res.end(JSON.stringify(users[index]));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ message: "User not found" }));
                }
            });
        }

        // 4. DELETE (User Hatana)
        else if (method === "DELETE" && id) {
            const index = users.findIndex(u => u.id === id);
            if (index !== -1) {
                const deleted = users.splice(index, 1);
                res.writeHead(200);
                res.end(JSON.stringify({ message: "User deleted", deleted }));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: "User not found" }));
            }
        }
    } 
    // Route nahi mila
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Route is wrong!" }));
    }
});

// Port 3000 par server start
server.listen(3000, () => {
    console.log("server start! Server running at http://localhost:3000");
});