var usuariosModel = {}
const mongoose = require("mongoose")
var Schema = mongoose.Schema

var usuariosSchema = new Schema({
    nombre:String,
    email:String,
    password:String,
    estado:String,
    codigo:String
})

const Mymodel = mongoose.model("usuarios",usuariosSchema)

usuariosModel.Registrar = function(post, callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password == post.password
    instancia.estado = 'Inactivo'
    instancia.codigo = post.codigo 

    instancia.save().then((respuesta)  => {
    return callback({state:true})
})
.catch((error) => {
    return callback({state:false, error:error})
})
}

usuariosModel.ListarTodos = function(post, callback){
    Mymodel.find({},{nombre:1, email:1})
    .then((respuesta) =>{
        return callback(respuesta)
    }).catch((error) =>{
        console.log(error)
        return callback({error:error})
    }) 
}

usuariosModel.Existe = function(post, callback){
    Mymodel.find({email:post.email},{})
    .then((respuesta) =>{
        return callback(respuesta)
    }).catch((error) =>{
        console.log(error)
        return callback({error:error})
    }) 
}

usuariosModel.Actualizar = function (post, callback)  {
    Mymodel.findOneAndUpdate({email:post.email},{nombre:post.nombre}).then((respuesta) =>{
        return callback({state:true})
    }).catch((error) =>{
        return callback({state:false, error:error})
    })
}

usuariosModel.Borrar = function (post, callback) {
    Mymodel.findOneAndUpdate({email:post.email}).then((respuesta) =>{
        return callback({state:true})
    }).catch((error) =>{
        return callback({state:false, error:error})
    })
};

usuariosModel.Login = function(post, callback){
    Mymodel.find({email:post.email, password:post.password},{password:0}).then((respuesta) =>{
        return callback(respuesta)
    }).catch((error) => {
        return callback({error:error})
    })
}
usuariosModel.Activar = function(post, callback){
    Mymodel.findOneAndUpdate({email:post.email, codigo:post.codigo},{estado:'Activo'}).then((respuesta) =>{
        return callback(respuesta)
    }).catch((err) =>{
        return callback({error:err})
    })
}

module.exports.usuariosModel = usuariosModel    