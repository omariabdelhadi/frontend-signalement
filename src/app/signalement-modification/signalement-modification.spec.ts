import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalementModification } from './signalement-modification';

describe('SignalementModification', () => {
  let component: SignalementModification;
  let fixture: ComponentFixture<SignalementModification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalementModification],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalementModification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
