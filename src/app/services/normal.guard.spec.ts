import { TestBed, async, inject } from '@angular/core/testing';

import { NormalGuard } from './normal.guard';

describe('NormalGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NormalGuard]
    });
  });

  it('should ...', inject([NormalGuard], (guard: NormalGuard) => {
    expect(guard).toBeTruthy();
  }));
});
