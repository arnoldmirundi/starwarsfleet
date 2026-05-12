import { inject, Injectable } from '@angular/core';
import { Starship } from '../models/starship';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class Api {
  private apiUrl = 'https://swapi.info/api/starships';
  private http = inject(HttpClient);


  getStarships(): Observable<Starship[]> {
    return this.http.get<Starship[]>(this.apiUrl);
  }
}
