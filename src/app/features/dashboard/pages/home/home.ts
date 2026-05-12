import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges
    .pipe(

      debounceTime(500),

      distinctUntilChanged()

    )
    .subscribe(value => {

      console.log('Buscar:', value);

    });
  }
}
