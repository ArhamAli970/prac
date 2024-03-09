const { faker, tr } = require('@faker-js/faker');
const mysql = require('mysql2'); 
const express=require('express');
const app= express();
const path=require("path");
const methodOverride= require('method-override');
const { error } = require('console');
const { cookie } = require('express/lib/response');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:"Arham@123"
  });

  app.get("/user",(req,res)=>{ 
    let q="SELECT id,username,email FROM USER";
    connection.query(q,(err,result)=>{ 
      try{ 
        let cnt=1;
          let data=result;
          res.render("doc.ejs",{result,cnt});
      }
      catch(err){ 
        res.send("db error");
      }
    })
  })



app.get("/",(req,res)=>{

  let q="SELECT count(*) FROM user"
  try{
connection.query(q,(err,result)=>{ 
    if(err){ 
        throw err;
    }
    // console.log(result);
    let cnt=result[0]['count(*)'];
       res.render("home.ejs",{cnt});
})
  }
  catch(err){ 
     res.send("error in db");
  }

// connection.end();
})




app.get("/user/:id/edit",(req,res)=>{ 
  let {id} = req.params; 
  // console.log(id);
  let q=`SELECT * FROM user WHERE id='${id}'`;
  try{
  connection.query(q,(err,result)=>{ 
      let user=result[0];
      res.render("edit.ejs",{user});
  }) 
}
catch(err){ 
  console.log("db error");
}
// connection.end();
})


app.patch("/user/:id",(req,res)=>{  
 
  let{id}=req.params;
  let{editUser,password}=req.body;
   
  let q=`SELECT * FROM user WHERE id='${id}'`;

   try{ 
    connection.query(q,(err,result)=>{ 
      if(err){throw err;}
      let nowUser=result[0];
      if(nowUser.password===password){ 
        let q1=`UPDATE user SET username='${editUser}' where id='${id}'`;
        try{
        connection.query(q1,(e,r)=>{ 
            res.redirect("/user");
        })  
      }catch(e){ 
        res.send("db prob");
      }

      }else{ 
        res.send("Password not matched");
      }
    })    

   }catch(err){ 
    console.log(err);
    res.send("db error");
   }

  //  connection.end();
  
});


app.get("/add",(req,res)=>{ 
  res.render("form.ejs");
})

app.post("/add",(req,res)=>{ 
  // console.log(req.body);
  let q=`INSERT INTO user VALUES (?,?,?,?)`;
  let user=[req.body.Id,req.body.username,req.body.email,req.body.password];
  
  try{ 
       connection.query(q,user,(err,result)=>{ 
        if(err){throw err;}
        res.redirect("/user");

       })
  }
  catch(err){ 
    res.send("db err")
  }

  
})


app.get("/user/:id/delete",(req,res)=>{ 
  let {id}=req.params;
  // console.log(id);
  let q=`SELECT * FROM user WHERE id='${id}'`;

  try{ 
    connection.query(q,(err,result)=>{  
      if(err){throw err;}
      let del=result[0]
      res.render("delForm.ejs",{del});
    })
  }
  catch{ 
    res.send("db error");
  }

})


app.delete("/user/:id/delete",(req,res)=>{ 
  let {id}=req.params;
  let {password}=req.body;
  console.log(id);
  let q=`SELECT password FROM user WHERE id='${id}'`;
  
  try{ 
    connection.query(q,(err,result)=>{ 
      if(err){throw err;}
      let pass=result[0];
        if(pass.password!==password){ 
          res.send("Passord not matched");
        }else{ 
          
          let q=`DELETE FROM user WHERE id='${id}'`;
           
          try{
          connection.query(q,(e,r)=>{ 
               if(e){throw e;}
               res.redirect("/user");
          })
        }
        catch(e){ 
          res.send("db error");
        }


        }

    })
  }
  catch{ 
    res.send("db err");
  }

})




app.listen(8080,()=>{
  console.log("post is listening");
})

// console.log(genRandomUser());







  // let genRandomUser=()=>{
  //   return [
  //      faker.datatype.uuid(),
  //      faker.internet.userName(),
  //      faker.internet.email(),
  //      faker.internet.password()
  //   ]
  // }
  

//   let q="INSERT INTO USER (id,username,email,password) VALUES (?,?,?,?)";
// let user=["12","arha@23","arham@gmail.com","user@21"]

// let q="INSERT INTO USER (id,username,email,password) VALUES ?";

// let users=[]

// for(let i=0;i<100;i++){
//   users.push(genRandomUser());
// }