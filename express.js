
const express = require("express");
const app = express();

app.use(express.json())

function myValidation(req,res,next){
    const {name,age}= req.body;
    if(!name || !age){
        return res.status(400).json({
            error:"Name and age are both required"
        })
    }
    if(typeof age !== 'number || age <1'){
        return res.status(400).json({error:"Age must be a positive number"})
    }
    next()
}

function myMiddleware(req,res,next){
    //do something
    next()
    next()
}

app.get("/",(req,res)=>{
    res.send("<h1>Home Page</h1>")
})

app.get("/students",(req,res)=>{
    res.send("<h1>Students Page</h1>")
})

app.post("/students",(req,res)=>{
    const data = req.body;
    console.log(data)
    res.send(data)
})

app.listen(4000,()=>{
    console.log("Server is running port 4000");
    
})