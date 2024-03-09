const express = require("express");

const app =express();

const { faker } = require("@faker-js/faker");

const mysql = require("mysql2");

const connection = mysql.createConnection({
host: "localhost",
user: "root",
database: "delta_app",
password: "Arham@123",
 });


 function getRandom(){

    let data={
        id:faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
    }
    return data;

 }

 app.get("/",(req,res)=>{
    let q="SELECT * FROM stud"

    try{
        connection.query(q,(err,resu)=>{
            if(err){throw err;}
            console.log(resu);
            res.render("but.ejs",{resu});
        })
    }
    catch(err){
        res.send(err.message);
    }
    
  
 })

app.post("/add",(req,res)=>{
    let data=getRandom()
    console.log(data);
    let d=[data.id,data.username,data.email];
    let q="insert into stud VALUES(?,?,?)"

    try{
        connection.query(q,d,(err,resu)=>{
            if(err){throw err;}
            res.send("hello")
        })
    }
    catch(err){
        res.send("db err");
    }
    
})








app.listen(8080, ()=>{

console.log("app is listening..");

});


// let createRandomUser ()->

// return

// id: faker.datatype.uuid(),

