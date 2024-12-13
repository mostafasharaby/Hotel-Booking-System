/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoomApiService } from './room-api.service';

describe('Service: RoomApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomApiService]
    });
  });

  it('should ...', inject([RoomApiService], (service: RoomApiService) => {
    expect(service).toBeTruthy();
  }));
});
