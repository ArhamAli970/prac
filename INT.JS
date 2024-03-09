const express=require('express');
const app= express();

const sql= require("mysql2")

let connection= sql.createConnection({ 
    host:'localhost',
    password:'Arham@123',
    database:'interview',
    user:'root'
})

app.get("/",(req,res)=>{ 
    let q= "SELECT * from user";
    try{
    connection.query(q,(e,result)=>{ 
     console.log(result[0].name);
    
    })
}
catch(e){ 

}
})




app.listen(8080,()=>{
    console.log("post is listening");
  })