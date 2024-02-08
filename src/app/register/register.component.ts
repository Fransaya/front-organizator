import { Component } from '@angular/core';
import { Router } from '@angular/router';

//* IMPORT PARA FOMULARIO
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private route: Router, ){}

  registerForm=new FormGroup({
    usu_nombre: new FormControl('',Validators.required),
    usu_email: new FormControl('',[Validators.required, Validators.email]),
    usu_contraseña:new FormControl('',Validators.required)
  });

  public RegisterUser():void{
    console.log("valores del formulario", this.registerForm.value)
    
    //* reseteo del formulario
    // this.registerForm.reset();
  };

  public irAInicioSesion(){
    this.route.navigate(['login']);
  }
}
