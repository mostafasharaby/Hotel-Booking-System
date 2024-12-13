/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilterCapacityService } from './filter-capacity.service';

describe('Service: FilterCapacity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterCapacityService]
    });
  });

  it('should ...', inject([FilterCapacityService], (service: FilterCapacityService) => {
    expect(service).toBeTruthy();
  }));
});
