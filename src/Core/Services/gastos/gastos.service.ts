import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { endopoint } from '../../../env/environment';
import { environment } from '../../../env/url_server';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getGastos(){
    const url_server= environment.apiUrl + endopoint.getGastos;

    const options={headers: this.authService.obtenerHears()};

    return this.http.get(url_server, options);
  };

  public postGasto(categoria:string, descripcion:string, monto:number, fecha_gasto:Date){
    const url_server= environment.apiUrl + endopoint.postGasto;

    const options={headers: this.authService.obtenerHears()};

    const body={categoria,descripcion,monto, fecha_gasto};

    return this.http.post(url_server,body, options);
  };

  public patchGasto(gastoId:number,categoria:string, descripcion:string, monto:number, fecha_gasto:Date){
    const url_server= environment.apiUrl + endopoint.updateGasto;

    const params=new HttpParams().set('gastoId',gastoId);

    const body={categoria,descripcion,monto,fecha_gasto}

    return this.http.patch(url_server,body,{params});
  };

  public deleteGasto(id:number){
    const url_server= environment.apiUrl + endopoint.deletGasto;

    const params= new HttpParams().set("gastoId",id);

    return this.http.delete(url_server,{params});
  }

  public deleteAll(){
    const url_server= environment.apiUrl + endopoint.deleteAllGastos;

    const options={headers: this.authService.obtenerHears()};

    return this.http.delete(url_server,options)
  }
}
