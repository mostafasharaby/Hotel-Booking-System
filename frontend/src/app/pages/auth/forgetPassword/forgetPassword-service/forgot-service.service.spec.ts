/* tslint:disable:no-unused-variable */

import { TestBed,  inject } from '@angular/core/testing';
import { ForgotServiceService } from './forgot-service.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Service: ForgotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotServiceService , provideHttpClient(), provideHttpClientTesting()]
      
    });
  });

  it('should ...', inject([ForgotServiceService], (service: ForgotServiceService) => {
    expect(service).toBeTruthy();
  }));
});
