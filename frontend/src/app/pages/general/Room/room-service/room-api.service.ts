import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthServiceService } from '../../../auth/auth-services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoomApiService {

private roomdUrl =  `${environment.api}/Rooms`;  
  constructor(private http: HttpClient , private authService :AuthServiceService) {}

  getAllRooms(): Observable<any> {   
    return this.http.get<any>(this.roomdUrl, {
      headers: this.authService.getHeaders()
    });
  }

  getRoomById(roomID: number): Observable<any> {
    return this.http.get<any>(`${this.roomdUrl}/${roomID}`, {
      headers: this.authService.getHeaders()
    });
  }
  private resetSubject = new BehaviorSubject<boolean>(false);  
  resetObservable$ = this.resetSubject.asObservable();

  resetRooms() {
    this.resetSubject.next(true);
  }
}
