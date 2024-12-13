/* tslint:disable:no-unused-variable */

import { TestBed,  inject } from '@angular/core/testing';
import { ForgotServiceService } from './forgot-service.service';

describe('Service: ForgotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotServiceService]
    });
  });

  it('should ...', inject([ForgotServiceService], (service: ForgotServiceService) => {
    expect(service).toBeTruthy();
  }));
});
