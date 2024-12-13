/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaymentServiceService } from './payment-service.service';

describe('Service: PaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentServiceService]
    });
  });

  it('should ...', inject([PaymentServiceService], (service: PaymentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
