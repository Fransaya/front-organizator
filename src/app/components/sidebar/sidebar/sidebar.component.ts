import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//? SERVICIO DE LOGOUT
import { AuthService } from '../../../../Core/Services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private authServices: AuthService){};

  ngOnInit(): void {
    
  }
  
  //* funcion para navegar y redirign a la ruta
  public routerTo(route:string):void{
    setTimeout(()=>{
      this.router.navigateByUrl(route,)
    },200)
    
  };
  
  public logout(){
    try{
      const token= this.authServices.getToken()
      console.log("token obtenido", token)
      if(token){
        this.authServices.logout(token).subscribe({
          next:(res)=>{
            console.log("respuesta al desloguear", res)
            if(res.succes){
              const response= this.authServices.removeToken()
              if(response){
                this.router.navigate(["/login"])
              }
            }
          },
          error:(err)=>{
            console.error("Error al desloguar", err)
          }
        })
      }
    }catch(err){
      console.error("Error interno del servidor", err)
    }
  };

  
}
