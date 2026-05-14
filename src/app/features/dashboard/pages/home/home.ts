import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, finalize, tap, catchError, of  } from 'rxjs';
import { CondominiumService } from '../../../../core/services/condominium/condominium';
import { Condominium } from '../../../../core/models/condominium.model';
import { CondominiumCard } from '../../../../shared/components/condominium-card/condominium-card';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CondominiumCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class HomeComponent {
  constructor(
    private CondominiumService: CondominiumService
  ){}

  isLoading = false;

  errorMessage = '';

  condominiums: Condominium[] = [];

  favorites: Condominium[] = [];

  searchControl = new FormControl('');

  ngOnInit() {
    this.CondominiumService
    .getCondominiums('')
    .subscribe(data => {

      this.condominiums = data;

      console.log(data);

    });

    this.searchControl.valueChanges
    .pipe(

      debounceTime(500),

      distinctUntilChanged(),

      tap(() => {
        this.isLoading = true;
      }),

      switchMap(searchTerm =>
        this.CondominiumService
          .getCondominiums(searchTerm || '')
          .pipe(
            catchError(() => {
              this.errorMessage =
                'Erro ao buscar condomínios';
              return of([]);
            }),

            finalize(() => {
              this.isLoading = false;
            })
          )
      )

    )
    .subscribe(data => {

      this.condominiums = data;

    });
  }
  onFavorite(condominium: Condominium): void {

    const alreadyExists =
      this.favorites.some(
        favorites => favorites.id === condominium.id
      );

    if(alreadyExists) {
      return;
    }

    this.favorites.push(condominium);

    this.condominiums =
    this.condominiums.map(condo =>

      condo.id === condominium.id
        ? {
            ...condo,
            favorite: !condo.favorite
          }
        : condo

    );

  }
}
