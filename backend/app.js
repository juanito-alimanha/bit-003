const express = require('express') ;
global.app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
global.config = require("./config.js").config;
const mongoose = require("mongoose")
global.SHA256 = require("sha256")
var cors = require("cors")

app.use(cors({
    origin:function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
        if(config.listablanca.indexOf(origin) === -1){
            return callback("error de cors sin permiso para: " + origin, false)
        }else{
            return callback(null, true)
        }
    },credentials:true
}))


require("./rutas.js");

mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd ).then((res) => {
    console.log("conectado a Mongo correctamente")
}). catch((err) =>{
    console.log(err)
})

app.listen(config.puerto, function(){
    console.log("Servidor funcionando en " + config.puerto)
})