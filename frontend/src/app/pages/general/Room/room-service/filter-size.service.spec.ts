/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FilterSizeService } from './filter-size.service';

describe('Service: FilterSize', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterSizeService]
    });
  });

  it('should ...', inject([FilterSizeService], (service: FilterSizeService) => {
    expect(service).toBeTruthy();
  }));
});
