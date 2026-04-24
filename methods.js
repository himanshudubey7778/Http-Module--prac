const http = require("http");
const users = [{id:1,name:"himanshu"},{id:2,name:"Aman"}]
let nextId = 3

const server = http.createServer((req,res)=>{
    const parsed = new URL(req.url,"http//localhost:3000")

    const pathname = parsed.pathname;
    const part = pathname.split("/");
    
})

    