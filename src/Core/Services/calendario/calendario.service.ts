import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { endopoint } from '../../../env/environment';
import { environment } from '../../../env/url_server';
import { AuthService } from '../auth/auth.service';
import { UrlHandlingStrategy } from '@angular/router';
import { updateLocale, utc } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getEventos(){
    const url_server=environment.apiUrl + endopoint.getEvento;

    const options={headers: this.authService.obtenerHears()};

    return this.http.get(url_server, options);
  };

  public postEvento(fecha_seleccionada:Date, titulo:string, descripcion:string){
    const url_server=environment.apiUrl + endopoint.postEvento;

    const options={headers:this.authService.obtenerHears()};

    const body={
      titulo,
      descripcion,
      fecha_seleccionada
    }

    return this.http.post(url_server, body, options);
  };

  public patchEvent(id:number, titulo:string, descripcion:string, fecha_seleccionada:Date){
    const url_server= environment.apiUrl + endopoint.updateEvento;

    const params= new HttpParams().set("eventoId",id);

    const body={
      titulo,
      descripcion,
      fecha_seleccionada
    };

    return this.http.patch(url_server,body,{params});
  };

  public deleteEvent(id:number){
    const url_server= environment.apiUrl + endopoint.deleteEvento;

    const params= new HttpParams().set("eventoId", id);

    return this.http.delete(url_server,{params});
  };


}
