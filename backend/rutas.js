var usuariosController = require("./api/controladores/usuariosController.js").usuariosController

app.post("/usuarios/registrar", function (request, response) {
  usuariosController.Registrar(request, response)  
})

app.put("/usuarios/actualizar",function(request, response){
  usuariosController.Actualizar(request, response)
})
app.post("/usarios/borrar", function (request, response) {
  usuariosController.Borrar(request, response);
});
app.get("/usuarios/ListarTodos", function (request, response) {
  usuariosController.ListarTodos(request, response) 
})

app.post("/usuarios/login", function (request, response) {
  usuariosController.Login(request, response)  
})

app.get("/usuarios/activar/:email/:codigo", function (request, response) {
  usuariosController.Activar(request, response)  
})