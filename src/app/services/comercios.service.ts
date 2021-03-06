import { ComercioModel } from 'src/app/models/comercio.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComerciosService {
  private url = 'http://pure-springs-70195.herokuapp.com';
  
  constructor( private http: HttpClient) { }

  
  crearComercio( comercio: ComercioModel ){
    return this.http.post(`${ this.url }/comercio`, comercio)
          .pipe(
            map( (resp: any)=> {
              comercio.id = resp.data.id;
              return comercio;
            })
          );
  }

  actualizarComercio( comercio: ComercioModel ){

    const comercioTemp = {
      ...comercio
    };

    delete comercioTemp.id;

    return this.http.put(`${ this.url }/comercio/${ comercio.id }`, comercioTemp);
  }

  getComercios(){
    return this.http.get(`${ this.url }/comercio`);
              /* .pipe(
                map( this.crearArreglo )
              ) */
  }
  
  /* private crearArreglo( comerciosObj: object ){

    const comercios: ComercioModel [] = [];

    if ( comerciosObj === null ) { return []; }

    Object.keys( comerciosObj ).forEach( key => {
      const comercio: ComercioModel = comerciosObj[key];
      comercio.id = parseInt(key);

      comercio.push( comercio );
    })
    
    return comercios;
  } */
}
