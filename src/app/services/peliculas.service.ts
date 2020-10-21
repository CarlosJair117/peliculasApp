import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteleraResponse } from '../interfaces/catelera-response';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;

  constructor( private http: HttpClient ) { }

  get params(){
    return{
      api_key:'3a26c5d1cdf3a39c298d8e4a0914ce98',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera():Observable<CarteleraResponse> {
    return this.http.get<CarteleraResponse>(`${ this.baseUrl}/movie/now_playing`,{
      params: this.params
    }).pipe(
      tap(() => {
        this.carteleraPage += 1;
      })
    );
  } 
}
