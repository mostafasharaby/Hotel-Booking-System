/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { RoomApiService } from './room-api.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthServiceService } from '../../../auth/auth-services/auth-service.service';

/*
    Summary
    Step	Explanation`
    Call getAllRooms()	Calls http.get(...) and returns an observable
    Subscribe to the observable	Waits for data to be emitted
    Use httpMock.expectOne()	Captures the outgoing HTTP request
    Call req.flush(mockRooms)	Pushes mockRooms into the Observable → triggers .subscribe()
    data === mockRooms	Beca`use flush() made it so
 */

describe('Service: RoomApi', () => {
  let service: RoomApiService;
  let httpMock: HttpTestingController;
  const mockAuthService = {
    getHeaders: () => ({ Authorization: 'Bearer fake-token' })
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomApiService, provideHttpClient(), provideHttpClientTesting(), {
        provide: AuthServiceService, useValue: mockAuthService
      }]
    });
    service = TestBed.inject(RoomApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([RoomApiService], (service: RoomApiService) => {
    expect(service).toBeTruthy();
  }));



  it('should fetch all rooms with correct headers', () => {
    const mockRooms = [
      { roomID: 1, roomName: 'Room A' },
      { roomID: 2, roomName: 'Room B' }
    ];

    service.getAllRooms().subscribe((data) => {
      console.log("data after subscribition ", data)
      expect(data).toEqual(mockRooms);
      expect(data.length).toBe(2);
      let second = data.find((room: any) => room.roomID == 2);
      expect(second.roomName).toBe('Room B');
    });


    const req = httpMock.expectOne('http://localhost:5004/api/Rooms');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

    req.flush(mockRooms); // simulate response

    //flush() pushes the fake response data (mockRooms) into the Observable.
    // without it will give -> SPEC HAS NO EXPECTATIONS should fetch all rooms with correct headers
    // without it the code doesnot trigger to subscribe 
  });


  it('should fetch a single room with Id', () => {
    const mockRoom = [
      { roomID: 1, roomName: 'Room A' }
    ];

    service.getRoomById(1).subscribe((data) => {
      console.log("getRoomById after subscribition", data[0].roomName)
      expect(data).toEqual(mockRoom);
    });

    const req = httpMock.expectOne('http://localhost:5004/api/Rooms/1');
    expect(req.request.method).toBe('GETs');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockRoom); // simulate response
  
  });


});  