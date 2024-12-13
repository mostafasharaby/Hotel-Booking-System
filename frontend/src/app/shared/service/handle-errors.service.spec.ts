/* tslint:disable:no-unused-variable */

import { TestBed,  inject } from '@angular/core/testing';
import { HandleErrorsService } from './handle-errors.service';

describe('Service: HandleErrors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandleErrorsService]
    });
  });

  it('should ...', inject([HandleErrorsService], (service: HandleErrorsService) => {
    expect(service).toBeTruthy();
  }));
});
