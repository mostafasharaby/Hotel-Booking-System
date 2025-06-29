/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PaymentServiceService } from './payment-service.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Service: PaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentServiceService ,provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('should ...', inject([PaymentServiceService], (service: PaymentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
