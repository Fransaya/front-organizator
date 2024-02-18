import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { endopoint } from '../../../env/environment';
import { environment } from '../../../env/url_server';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getTareas(){
    const url_server= environment.apiUrl + endopoint.getTareasId

    const options={headers: this.authService.obtenerHears()};

    return this.http.get(url_server, options)
  };

  public postTarea(prioridad:number, descripcion:string, estado:number){
    const url_server= environment.apiUrl + endopoint.postTareas;

    const options={headers: this.authService.obtenerHears()};

    const body={prioridad, descripcion, estado};

    return this.http.post(url_server, body,options)
  };

  public patchTarea(id:number, prioridad:number, descripcion:string, estado:number){
    const url_server= environment.apiUrl + endopoint.updateTareas;

    const body={prioridad, descripcion, estado};

    const params= new HttpParams().set('tareaId', id);

    return this.http.patch(url_server, body,  {params})
  };

  public deleteTarea(id:number){
    const url_server= environment.apiUrl + endopoint.deletTareas;

    const params= new HttpParams().set('tareaId', id);

    return this.http.delete(url_server, {params});
  }
}
