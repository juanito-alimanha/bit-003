import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor(private peticion: PeticionService){}

  nombre:string = ""
  email:string = ""
  password:string = ""

  Registrar(){

    var post = {
      host:this.peticion.urlHost,
      path:"/usuarios/registrar",
      payload:{
        nombre:this.nombre,
        email:this.email,
        password:this.password
      }
    }
    
    this.peticion.Post(post.host + post.path, post.payload).then((respuesta:any) =>{
      console.log(respuesta)
      if(respuesta.state == false){
        Notiflix.Notify.failure(respuesta.mensaje)
      }else{
        Notiflix.Notify.success(respuesta.mensaje)
      }
    })
  }
}
