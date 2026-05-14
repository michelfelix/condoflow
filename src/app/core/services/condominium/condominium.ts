import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Condominium } from '../../models/condominium.model';

@Injectable({
  providedIn: 'root'
})
export class CondominiumService {

  private http = inject(HttpClient);

  getCondominiums(searchTerm: string) {

  return this.http
    .get<Condominium[]>(
      'https://jsonplaceholder.typicode.com/users-error'
    )
    .pipe(

      map(condominiums =>
        condominiums.filter(condo =>
          condo.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      )

    );
}
}