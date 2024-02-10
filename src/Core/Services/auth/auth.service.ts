import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { BehaviorSubject,Observable } from 'rxjs';
import { endopoint } from '../../../env/environment';
import { environment } from '../../../env/url_server';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient){ };

  //? FUNCION OBTIENE EL TOKEN DEL LOCALSTOGA
  private obtenerToken(){
    return  localStorage.getItem("token");
  }

  //? RETORNA EL HEADER CON EL TOKEN
  public obtenerHears():HttpHeaders{
    const token= this.obtenerToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    })
  }
  //? FUNCION DE LOGIN
  public login(correo: string, contraseña: string):Observable<any> {
    const urlApi= environment.apiUrl + endopoint.loginUsuario;
    const body={
      correo,
      contraseña
    };
    return this.http.post(urlApi, body);
  };
  //? FUNCION PARA DELOGUEAR
  public logout(token:string):Observable<any>{
    const urlApi= environment.apiUrl + endopoint.logoutUsuario;
    const header= new HttpHeaders(token);
    return this.http.post(urlApi, header);
  }

  public getToken():string | null {
    return localStorage.getItem('token');
  };

  isLogguedIn():boolean{
    const token=localStorage.getItem('token');
    return !token;
  };

}
