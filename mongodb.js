const {MongoClient} = require("mongodb");

const client = new MongoClient('mongodb://localhost:27017');

async function main(){
    await client.connect();
    console.log("connected")
    const db = client.db("students");

    const products = db.collection("products");
    await products.insertMany([
        {name:"Laptop",price:3700 ,category:"Electronic",quantity:10},
        {name:"Phone",price:1000 ,category:"Electronic",quantity:9},
        {name:"Shirt",price:2000 ,category:"Clothing",quantity:45},
        {name:"Pant",price:400 ,category:"Clothing",quantity:345},
    ]);

    const all = await 
}