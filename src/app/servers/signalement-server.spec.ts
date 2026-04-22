import { TestBed } from '@angular/core/testing';

import { SignalementServer } from './signalement-server';

describe('SignalementServer', () => {
  let service: SignalementServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalementServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
