import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalementsUserForA } from './signalements-user-for-a';

describe('SignalementsUserForA', () => {
  let component: SignalementsUserForA;
  let fixture: ComponentFixture<SignalementsUserForA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalementsUserForA],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalementsUserForA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
