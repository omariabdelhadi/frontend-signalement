import { TestBed } from '@angular/core/testing';

import { UserServer } from './user-server';

describe('UserServer', () => {
  let service: UserServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
