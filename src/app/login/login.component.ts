import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

//*MODULOS EXTERNOS
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToastModule } from 'primeng/toast';

//* IMPORTACION DE SERVICIO PARA LOGIN
import { AuthService } from '../../Core/Services/auth/auth.service';

//* IMPORTACION DE SWAL PARA ALERTA
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule,NgIf,MatCardModule,ToastModule,MatInputModule,MatFormFieldModule,InputGroupModule,InputGroupAddonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService]
  
})
export class LoginComponent{
  
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService){
    this.inicioFom();
  };

  cantErrorLogins:number=0;

  public loginForm: FormGroup= this.formBuilder.group({})

  private inicioFom(){
    this.loginForm=this.formBuilder.group({
      usu_correo: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      usu_contraseña: ['',[Validators.required,Validators.minLength(4)]]
    })
  }



  //* FUNCION DE LOGUIN USER
  public LoginUser():void {
    //* EXTRAIGO VALORES DE CORREO Y CONTRASEÑA DEL FORMULARIO
    const correo: string = this.loginForm.get("usu_correo")!.value;
    const contraseña: string = this.loginForm.get("usu_contraseña")!.value;
    
    if(!this.validationMail(correo)){
      this.messageService.add({ severity: 'error', summary: 'Invalido', detail: 'Correo o contraseña incorrecta.' });
    }

    //* VERIFICO SI EL FORMULARIO ES VALIDO
    if(this.loginForm.valid){
      this.authService.login(correo,contraseña).subscribe({
        next:(response)=>{
          //* guardo el token en el local storage
          localStorage.setItem('token',response.data.token);
          localStorage.setItem('sesion', response.data.id)
          if(response.succes){
            this.router.navigate(['/calendario'])
          }
          
        },
        error:(err)=>{
          //? inicio de sesion incorrecto
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Correo invalido.' });
          this.cantErrorLogins+=1;
          if(this.cantErrorLogins>=3){
            this.alertCreateAcount();
          }
        }
      })
    }else{
      console.log("formulario ivalido")
    }

    //* reseteo del formulario
    // this.loginForm.reset();
  }

  //* FUNCION PARA REGISTRAR
  public register(){
    this.router.navigate(['register'])
  }

  //? ALERTA PARA CREAR CUENTA
  public alertCreateAcount(){
    Swal.fire({
      title: '¿No tienes una cuenta?',
      text: 'Deseas crearte una.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#227050',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        ///? redireccion para crear cuenta
        this.router.navigate(["/register"])
      }else{
        this.cantErrorLogins=0;
      }
    });
  }

  //? METODO DE VALIDACION DE MAIL
  private validationMail(email:string):boolean{
    const resultEmail= email.includes("@");
    const result2= email.includes(".com");

    if(result2 && resultEmail){
      return true;
    }else{
      return false
    }
  }
}
