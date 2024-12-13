/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SortService } from './sort.service';

describe('Service: Sort', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortService]
    });
  });

  it('should ...', inject([SortService], (service: SortService) => {
    expect(service).toBeTruthy();
  }));
});
