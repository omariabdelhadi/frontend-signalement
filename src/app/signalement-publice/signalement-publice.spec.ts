import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalementPublice } from './signalement-publice';

describe('SignalementPublice', () => {
  let component: SignalementPublice;
  let fixture: ComponentFixture<SignalementPublice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalementPublice],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalementPublice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
