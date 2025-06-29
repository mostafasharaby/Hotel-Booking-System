/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CartService } from './cart.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Service: Cart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService,provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should ...', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));
});
