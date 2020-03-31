var express = require("express");
var app = express();
var db = require('./model/main.js');

var i = 0;
var nameList = ['小明','小蓝','小刚','小红','小白'];

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
      "json": result,
      "limit": limit
    })
  })
})

app.get("/add",function(req,res){
  var dbname = 'test';
  
  db.insertOne(dbname,"teacher",{"name": nameList[parseInt(Math.random()*nameList.length)],"count": i++,"age": parseInt(Math.random()*100),"dateTime": new Date().getTime()},function(err,result){
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