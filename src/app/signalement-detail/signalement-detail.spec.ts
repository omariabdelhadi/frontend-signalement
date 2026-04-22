import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalementDetail } from './signalement-detail';

describe('SignalementDetail', () => {
  let component: SignalementDetail;
  let fixture: ComponentFixture<SignalementDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalementDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalementDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
