/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SnakebarServiceService } from './SnakebarService.service';

describe('Service: SnakebarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnakebarServiceService]
    });
  });

  it('should ...', inject([SnakebarServiceService], (service: SnakebarServiceService) => {
    expect(service).toBeTruthy();
  }));
});
