import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Condominium } from '../../../core/models/condominium.model';

@Component({
  selector: 'app-condominium-card',
  imports: [],
  templateUrl: './condominium-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './condominium-card.scss',
})
export class CondominiumCard {
  @Input() condominium!: Condominium;
  @Output() favorite = new EventEmitter<Condominium>();

  onFavorite(): void {

    this.favorite.emit(this.condominium);

  }
}
