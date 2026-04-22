import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inscreption } from './inscreption';

describe('Inscreption', () => {
  let component: Inscreption;
  let fixture: ComponentFixture<Inscreption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inscreption],
    }).compileComponents();

    fixture = TestBed.createComponent(Inscreption);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
