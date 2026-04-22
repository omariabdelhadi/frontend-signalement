import { TestBed } from '@angular/core/testing';

import { CommentaireServer } from './commentaire-server';

describe('CommentaireServer', () => {
  let service: CommentaireServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentaireServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
