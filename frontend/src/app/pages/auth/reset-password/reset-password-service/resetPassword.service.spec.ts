/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResetPasswordService } from './resetPassword.service';

describe('Service: ResetPassword', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetPasswordService]
    });
  });

  it('should ...', inject([ResetPasswordService], (service: ResetPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
