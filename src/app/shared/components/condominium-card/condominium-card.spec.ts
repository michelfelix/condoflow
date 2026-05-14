import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondominiumCard } from './condominium-card';

describe('CondominiumCard', () => {
  let component: CondominiumCard;
  let fixture: ComponentFixture<CondominiumCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondominiumCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CondominiumCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
