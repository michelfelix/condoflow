import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Condominium } from '../../models/condominium.model';

@Injectable({
  providedIn: 'root'
})
export class CondominiumService {

  private http = inject(HttpClient);

  getCondominiums(): Observable<Condominium[]> {

    return this.http.get<Condominium[]>(
      'https://jsonplaceholder.typicode.com/users'
    );

  }
}