import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';


//* IMPORTACION DE SERVICIO PARA LOGIN
import { AuthService } from '../../Core/Services/auth/auth.service';

//* IMPORTACION DE SWAL PARA ALERTA
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent  {
  
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService){
    this.inicioFom();
  };

  public loginForm: FormGroup= this.formBuilder.group({})

  private inicioFom(){
    this.loginForm=this.formBuilder.group({
      usu_correo: ['', [Validators.required, Validators.minLength(2)]],
      usu_contraseña: ['',[Validators.required,Validators.minLength(2)]]
    })
  }



  //* FUNCION DE LOGUIN USER
  public LoginUser():void {
    console.log("valores del formulario", this.loginForm.value)
    //* EXTRAIGO VALORES DE CORREO Y CONTRASEÑA DEL FORMULARIO
    const correo: string = this.loginForm.get("usu_correo")!.value;
    const contraseña: string = this.loginForm.get("usu_contraseña")!.value;
    //* VERIFICO SI EL FORMULARIO ES VALIDO
    if(this.loginForm.valid){
      this.authService.login(correo,contraseña).subscribe({
        next:(response)=>{
          console.log("respuesta del servidor", response)
          //* guardo el token en el local storage
          localStorage.setItem('token',response.data.token);
          localStorage.setItem('sesion', response.data.id)
          if(response.succes){
            this.router.navigate(['/dashboard'])
          }
          
        },
        error:(err)=>{

        }
      })
    }else{
      console.log("formulario ivalido")
      Swal.fire("Formulario Invalido", "Complete los datos del formulario","error")
    }

    //* reseteo del formulario
    // this.loginForm.reset();
  }

  //* FUNCION PARA REGISTRAR
  public register(){
    this.router.navigate(['register'])
  }
}
