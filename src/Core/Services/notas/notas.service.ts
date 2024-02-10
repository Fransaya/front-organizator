import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import {Observable } from 'rxjs';
import { endopoint } from '../../../env/environment';
import { environment } from '../../../env/url_server';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService {


  constructor(private http: HttpClient, private authService: AuthService) {}

  public getNotas(){
    const urlApi=environment.apiUrl + endopoint.getNotasId;

    const opciones= {headers: this.authService.obtenerHears()};

    return this.http.get(urlApi, opciones);
  }

  //? CREAR NOTAS
  public crearNota( titulo: string, contenido:string){
    const urlApi=environment.apiUrl + endopoint.postNotas;
    
    //? OBTENGO EL TOKEN EN HEADER DEL AUTH SERVICE
    const opciones = {headers:this.authService.obtenerHears()};
    //? ENVIO DATOS POR BODY
    const body={titulo, contenido}
    
    return this.http.post(urlApi, body, opciones );
  };

  public modificarNota(id:number, titulo:string, contenido:string){

  };

  public eliminarNota(id:number){
      const urlApi= environment.apiUrl + endopoint.deleteNotas;
      const params=new HttpParams().set("notaId",id);
      return this.http.delete(urlApi, {params});
  }
}
