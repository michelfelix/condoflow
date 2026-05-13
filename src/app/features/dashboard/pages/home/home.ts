import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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

      switchMap(searchTerm =>
        this.CondominiumService.getCondominiums(searchTerm || '')
      )

    )
    .subscribe(data => {

      this.condominiums = data;

      console.log(data);

    });
  }
}
