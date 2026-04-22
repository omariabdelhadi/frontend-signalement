import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentaires } from './user-commentaires';

describe('UserCommentaires', () => {
  let component: UserCommentaires;
  let fixture: ComponentFixture<UserCommentaires>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCommentaires],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCommentaires);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
