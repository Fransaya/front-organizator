import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent  {
  
  constructor(private router: Router, private formBuilder: FormBuilder){
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

    //* reseteo del formulario
    // this.loginForm.reset();
  }

  //* FUNCION PARA REGISTRAR
  public register(){
    this.router.navigate(['register'])
  }
}
