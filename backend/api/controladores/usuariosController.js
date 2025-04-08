const { text } = require("express")
var nodemailer = require('nodemailer')
var usuariosController = {}
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel


  usuariosController.Registrar = function (request, response) {
  
    var post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password
  }

  if (post.nombre == undefined || post.nombre == null || post.nombre == '') {
    response.json({state: false,mensaje: "El campo de nombre es obligatorio"})
    return false
  }

  if (post.email == undefined || post.email == null || post.email == '') {
    response.json({state: false,mensaje: "El campo de email es obligatorio"})
    return false
  }

  if (post.password == undefined || post.password == null || post.password == '') {
    response.json({state: false,mensaje: "El campo de password es obligatorio"})
    return false
  }
  
  post.password = SHA256(post.password + config.secret)

  usuariosModel.Existe(post,function(ex){
      if (ex.length == 0) {

        post.codigo ='G-' + Math.floor(Math.random() * (9999 - 1000) + 1000);
        
        const transporter = nodemailer.createTransport({
          host:config.email.host,
          port:config.email.port,
          secure:false,
          requireTLS:true,
          auth:{
            user:config.email.user,
            pass:config.email.pass
          }
        })

        var mailOptions = {
          from:config.email.user,
          to:post.email,
          subject: "Verifica tu cuenta con el codigo" + post.codigo,
          text:"activa tu cuenta con este link en tu navegador" + post.email +'/'+post.codigo
        }

        transporter.sendMail(mailOptions, (error, info) =>{
          if (error) {
            console.log(error)
          } else {
            console.log(info)
          }
        })

        usuariosModel.Registrar(post, function (res) {
          if (res.state == true) {
            response.json({ state: true, mensaje: "Usuario guardado correctamente" })
            return false
          } 
          else {
              response.json({ state: false, mensaje: "Error al guardar el usuario" })
              return false
          }
        })
      } else {
        response.json({state:false, mensaje:"el correo ya existe en la base de datos"})
        return false
      }
     })
    }
    usuariosController.ListarTodos = function (request, response) {
    usuariosModel.ListarTodos(null, function (respuesta) {
        response.json(respuesta);
      });
    } 
    usuariosController.Actualizar = function (request, response) {
      var post = {
        nombre: request.body.nombre,
        email: request.body.email,
      };
    
      if (post.nombre == undefined || post.nombre == null || post.nombre == "") {
        response.json({state: false,mensaje: "El campo de nombre es obligatorio",});
        return false;
      }
    
      if (post.email == undefined || post.email == null || post.email == "") {
        response.json({state: false,mensaje: "El campo de email es obligatorio",});
        return false;
      }
    
      usuariosModel.Existe(post, function (ex) {
         
        if (ex.lenght == 0) {
           response.json({state: false,mensaje: "No podemos actualizar un email que existe no en la base de datos",});
           return false;
         } else {

           usuariosModel.Actualizar(post, function (respuesta) {
             if (respuesta.state == true) {
               response.json({state: true,mensaje: "Usuario actualizado correctamente",});
               return false;
             }
             else{
              response.json({state:false,mensaje:"error al actualizar", error:respuesta.error})
              return false
            }
           });
         }
      });
    }
    usuariosController.Borrar = function (request, response) {
      var post = {
        email: request.body.email,
      }

      if (post.email == undefined || post.email == null || post.email == "") {
        response.json({state: false,mensaje: "El campo de email es obligatorio"})
        return false
      }
    
      usuariosModel.Existe(post, function (ex) {
        if (ex.length == 0) {response.json({state:false,mensaje: "No podemos eliminar un email que existe no en la base de datos",});
          return false

        } else {

          usuariosModel.Borrar(post, function (respuesta) {
            if (respuesta.state == true) {response.json({state: true,mensaje: "Usuario eliminado correctamente",
              });
              return false;
            }
          })
        }
      })
    }
    usuariosController.Login = function(request, response){
    var post = {
      nombre: request.body.nombre,
      email: request.body.email,
      password: request.body.password
    }
  
    if (post.email == undefined || post.email == null || post.email == '') {
      response.json({state: false,mensaje: "El campo de email es obligatorio"})
      return false
    }
  
    if (post.password == undefined || post.password == null || post.password == '') {
      response.json({state: false,mensaje: "El campo de password es obligatorio"})
      return false
    }

    post.password = SHA256(post.password + config.secret)

    usuariosModel.Login(post, function(datos){
      if (datos.length == 0) {
      
        response.json({state:true, mensaje:"Tus credenciales son invalidas"})
          return false
      } else {
        if (datos[0].estado == 'inactivo') {
          response.json({state:true,mensaje:"Cuenta inactiv " })
          return false

        } else {
              
        response.json({state:true,mensaje:"Bienvenidos: " + datos[0].nombre})
          return false
      }
            }
    })
  usuariosController.Activar = function(request, response){
    var post = {
      email:request.params.email,
      codigo:request.params.codigo
    }
    if(post.email == undefined || post.email == null || post.email == ''){
      response.json({state:false,mensaje:"El campo email es obligatorio"})
      return false
    }
    if(post.codigo == undefined || post.codigo == null || post.codigo == ''){
      response.json({state:false,mensaje:"El campo codigo es obligatorio"})
      return false
    }
usuariosModel.Activar(post, function(respuesta){
    if( respuesta == null){
      response.json({state:false,mensaje:"No se pudo activar la cuenta"})
      return false
    }
    if( respuesta == null){
      response.json({state:false,mensaje:"Cuenta activada"})
      return false
    }
  })
  }
    }
module.exports.usuariosController = usuariosController
