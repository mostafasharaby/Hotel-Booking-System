/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ResetPasswordService } from './resetPassword.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Service: ResetPassword', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [ResetPasswordService, provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('should ...', inject([ResetPasswordService], (service: ResetPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
