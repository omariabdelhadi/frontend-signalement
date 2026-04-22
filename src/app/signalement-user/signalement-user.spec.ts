import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalementUser } from './signalement-user';

describe('SignalementUser', () => {
  let component: SignalementUser;
  let fixture: ComponentFixture<SignalementUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalementUser],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalementUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
