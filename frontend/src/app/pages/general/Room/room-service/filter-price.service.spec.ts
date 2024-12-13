/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilterPriceService } from './filter-price.service';

describe('Service: FilterPrice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterPriceService]
    });
  });

  it('should ...', inject([FilterPriceService], (service: FilterPriceService) => {
    expect(service).toBeTruthy();
  }));
});
