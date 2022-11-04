import { Usuario2, Cliente2 } from './../interfaces/UserAuth';
import { Router } from '@angular/router';
import { ServidorMsg, Usuario} from './../interfaces/User';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2'
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  section: number = 1;
  progressBar: string = "width: 8%;"
  btnProgress1: string = "position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"
  btnProgress2: string = "position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary rounded-pill"
  btnProgress3: string = "position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"

  usuario: Usuario = new Usuario();
  // user: Usuario2 = {
  //   cliente:{
  //     id:  0,
  //     cedula:             '',
  //     nombre:             '',
  //     apellido:           '',
  //     email:              '',
  //     emailEncripted:     '',
  //     password:           '',
  //     telefono:           '',
  //     direccion:          '',
  //     estado:              false,
  //     estadoTokenRegistro: false,
  //     roles:               [],
  //     longitud:            null,
  //     latitud:             null,
  //   }
  // };
    
  mensaje: ServidorMsg = new ServidorMsg();
  usuarioSave: Usuario[] = [];

  progress1(){
    this.btnProgress1 = 'position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill'
    this.btnProgress2 = 'position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary rounded-pill'
    this.btnProgress3 = 'position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill'
    this.section = 1;
    this.progressBar = 'width: 8%;'
    return
  }
  progress2(){
      // valido el primer form
    if (this.usuario.nombre === undefined || this.usuario.apellido === undefined) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: '#000000',
        color: '#ccc',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'info',
        title: 'Rellene todo los campos'
      })
    } else if (this.usuario.nombre.length === 0 || this.usuario.apellido.length === 0 || this.usuario.nombre.trim().length === 0 || this.usuario.apellido.trim().length === 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: '#000000',
        color: '#ccc',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'info',
        title: 'Rellene todo los campos'
      })
    } else {
      this.btnProgress1 = 'position-absolute top-0 start-0 translate-middle btn btn-sm btn-success rounded-pill'
      this.btnProgress2 = 'position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill'
      this.btnProgress3 = 'position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill'
      this.section = 2;
      this.progressBar = 'width: 50%;'
    }
    return
  }
  verificarCel(texto: string){
    const letras="abcdefghyjklmnñopqrstuvwxyz";
    texto = texto.toLowerCase();
    for(var i=0; i<texto.length; i++){
      if (letras.indexOf(texto.charAt(i),0)!=-1){
          return 1;
      }
    }
    return 0;
  }
  progress3(){
    if (this.usuario.cedula === undefined || this.usuario.telefono === undefined || this.usuario.direccion === undefined) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: '#000000',
        color: '#ccc',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'info',
        title: 'Rellene todo los campos'
      })
    } else if (this.usuario.cedula.length === 0 || this.usuario.telefono.length === 0 || this.usuario.direccion.length === 0 || this.usuario.cedula.trim().length === 0 || this.usuario.telefono.trim().length === 0 || this.usuario.direccion.trim().length === 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: '#000000',
        color: '#ccc',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'info',
        title: 'Rellene todo los campos'
      })
    } else if (this.verificarCel(this.usuario.telefono)) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: '#000000',
        color: '#ccc',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'info',
        title: 'Campo Telefono no permite letras'
      })
    } else {
      this.btnProgress1 = 'position-absolute top-0 start-0 translate-middle btn btn-sm btn-success rounded-pill'
      this.btnProgress2 = 'position-absolute top-0 start-50 translate-middle btn btn-sm btn-success rounded-pill'
      this.btnProgress3 = 'position-absolute top-0 start-100 translate-middle btn btn-sm btn-primary rounded-pill'
      this.progressBar = 'width: 100%;'
      this.section = 3;
    }
    return
  }
  guardarUser() {
    const regex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,63}$/i;
    if (this.usuario.email === undefined || this.usuario.password === undefined) {
      alert('rellena este form')
    } else if (this.usuario.email.length === 0 || this.usuario.password.length === 0 || this.usuario.email.trim().length === 0 || this.usuario.password.trim().length === 0) {
      alert('Rellena primero este form')
    }  else if (!regex.test(this.usuario.email)) {
      alert('Correo No valido')
    } else {
      this.btnProgress3 = 'position-absolute top-0 start-100 translate-middle btn btn-sm btn-success rounded-pill'

      this.authService.registerUser(this.usuario).subscribe(
        (resp) => {
          console.log("Respuesta: ",resp);         
          // this.usuarioSave.push(this.usuario)
          // this.usuario = new Usuario()
        }, (err) => {
          //Alerta de ERROR
          console.log("Datos Usuario: ", this.usuario);  
          console.log('Error: ',err);
          // console.log("Mensaje del Servidor: " + this.mensaje.mensaje)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error',
            showConfirmButton: false,
            timer: 1500
          })
        }, async () => {
          //Alerta satisfactoria de usuario guardado
          this.router.navigateByUrl('/login')
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario Registrado',
            showConfirmButton: false,
            timer: 1500
          })
      })
    }
  }

  // new(){
  //   this.authService.registerUser2(this.user.cliente).subscribe(
  //     (resp) => {
  //       console.log("Datos Usuario: ", resp);
  //     }, (err) => {
  //       console.log('Error: ',err);
  //       console.log("Mensaje del Servidor: ", err.mensaje)

  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'error',
  //         title: 'Error',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //     }, async () => {
  //       console.log("Usuario Registrado");
        
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'Usuario Registrado',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //   })
  // }

  ngOnInit(): void {
  }

}