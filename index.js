const express = require("express");
const app = express();
const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let db;

MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
  if (err !== null) {
    console.log(err);
  } else {
    db = client.db("series");
  }
});

app.get("/api/series",function(req,res){
    db.collection("series").find().toArray(function(err,datos){
        if (err!==null){
            res.send(err);
        }else{
            res.send(datos);
        }
    });
});

app.get("/api/series/:titulo",function(req,res){
 const titulo=req.params.titulo;
       
    db.collection("series").find({titulo:titulo}).toArray (function(err,datos){
        if(err!==null){
            res.send(error);
        }else{
            res.send(datos);
        }
    });
});

app.post("/api/nuevaSerie",function(req,res){
    let serie={
        titulo:req.body.titulo,
        plataforma:req.body.plataforma,
        nota:parseInt(req.body.nota)
    }
    db.collection("series").insertOne(serie,function(err,datos){
        if(err!==null){
            res.send(err);
        }else{
            db.collection("series").find().toArray(function(err,datos){
                if(err!==null){
                    res.send(err);
                }else{
                    res.send(datos);
                }
            });
        }
    });
});





app.listen(3000);
