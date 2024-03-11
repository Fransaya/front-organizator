import { Component } from '@angular/core';
import { Router } from '@angular/router';

//* IMPORT PARA FOMULARIO
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

//? SERVICIO DE AUTHENTICACION
import { AuthService } from '../../Core/Services/auth/auth.service';

import Swal from 'sweetalert2';

//? INTERFACE DE RESPUESTA
@Component({
  selector: 'app-register',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule,NgIf,InputGroupModule,InputGroupAddonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private route: Router,private authServices: AuthService ){}

  registerForm=new FormGroup({
    usu_nombre: new FormControl('',Validators.required),
    usu_email: new FormControl('',[Validators.required, Validators.email]),
    usu_contraseña:new FormControl('',Validators.required)
  });

  public RegisterUser():any{
    const usuario= this.registerForm.value.usu_nombre!;
    const correo= this.registerForm.value.usu_email!;
    const contraseña=this.registerForm.value.usu_contraseña!;
    if(this.valiidationDates(usuario, correo, contraseña)){
      try{
        this.authServices.register(usuario, correo, contraseña).subscribe({
          next:(res:any)=>{
            if(res.succes){
              localStorage.setItem('token',res.data.token);
              localStorage.setItem('session',res.data.userId);
              this.route.navigate(['calendario']);
            }else{
              Swal.fire("Error","Succedio un error al registrarse", "error");
            }
          },
          error:(err)=>{
            console.error("Error al registrar usuario",err);
            throw err;
          }
        })
      }catch(err){
        console.error("Error interno del servidor");
      }
    }
    //* reseteo del formulario
    // this.registerForm.reset();
  };

  public valiidationDates(usuario:string, email:string, contraseña:string):any{
    if(usuario!=="" && usuario){
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(email!=="" && email && regexEmail.test(email)){
        if(contraseña!=="" && contraseña){
          return true;
        }else{
          return "La contraseña es invalida"
        }
      }else{
        return "El correo electronico es invalido"
      }
    }else{
      return "Debe ingresar un nombre de usuario"
    }
  }

  public irAInicioSesion(){
    this.route.navigate(['login']);
  }
}
