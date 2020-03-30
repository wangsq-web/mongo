var express = require("express");
var app = express();
var db = require('./model/main.js');

var i = 0;

app.set("view engine","ejs");
app.use(express.static("./public"));

app.get("/",function(req,res){
  var page = parseInt(req.query.page) || 0;
  var limit = parseInt(req.query.limit) || 10;

  var dbname = 'test';
  db.find(dbname,"teacher",{},{"pageamount": limit,"page": page},function(err,result){
    if(err){
      console.log(err)
      return;
    }
    console.log(result)
    // res.json(result);
    res.render("index",{
      "json": result
    })
  })
})

app.get("/add",function(req,res){
  var dbname = 'test';
  db.insertOne(dbname,"teacher",{"name":"小明","count": i++,"age": parseInt(Math.random()*100)},function(err,result){
    if(err){
      console.log("添加失败")
      return;
    }
    res.send('添加成功');
  })
})

// app.get("/cha",function(req,res){
//   var page = parseInt(req.query.page) || 0;
//   var limit = parseInt(req.query.limit) || 10;

//   var dbname = 'test';
//   db.find(dbname,"teacher",{},{"pageamount": limit,"page": page},function(err,result){
//     if(err){
//       console.log(err)
//       return;
//     }
//     console.log(result)
//     res.json(result);
//   })
// })

app.listen(3000);