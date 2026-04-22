import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationSignalement } from './creation-signalement';

describe('CreationSignalement', () => {
  let component: CreationSignalement;
  let fixture: ComponentFixture<CreationSignalement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationSignalement],
    }).compileComponents();

    fixture = TestBed.createComponent(CreationSignalement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
