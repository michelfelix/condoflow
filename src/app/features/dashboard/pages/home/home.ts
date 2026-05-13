import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, finalize, tap } from 'rxjs/operators';
import { CondominiumService } from '../../../../core/services/condominium/condominium';
import { Condominium } from '../../../../core/models/condominium.model';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class HomeComponent {
  constructor(
    private CondominiumService: CondominiumService
  ){}

  isLoading = false;

  condominiums: Condominium[] = [];

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
}
