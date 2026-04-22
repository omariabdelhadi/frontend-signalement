import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Commentaires } from './commentaires';

describe('Commentaires', () => {
  let component: Commentaires;
  let fixture: ComponentFixture<Commentaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Commentaires],
    }).compileComponents();

    fixture = TestBed.createComponent(Commentaires);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
