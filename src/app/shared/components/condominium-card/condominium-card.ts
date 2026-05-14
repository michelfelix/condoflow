import { Component, Input } from '@angular/core';
import { Condominium } from '../../../core/models/condominium.model';

@Component({
  selector: 'app-condominium-card',
  imports: [],
  templateUrl: './condominium-card.html',
  styleUrl: './condominium-card.scss',
})
export class CondominiumCard {
  @Input() condominium!: Condominium;
}
