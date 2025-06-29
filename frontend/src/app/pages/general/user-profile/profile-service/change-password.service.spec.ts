/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ChangePasswordService } from './change-password.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Service: ChangePassword', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePasswordService, provideHttpClient(), provideHttpClientTesting()]
    });
  });

  it('should ...', inject([ChangePasswordService], (service: ChangePasswordService) => {
    expect(service).toBeTruthy();
  }));
});
