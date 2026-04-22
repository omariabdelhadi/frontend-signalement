import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierProfile } from './modifier-profile';

describe('ModifierProfile', () => {
  let component: ModifierProfile;
  let fixture: ComponentFixture<ModifierProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
