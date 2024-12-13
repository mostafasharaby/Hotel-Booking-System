import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuthServiceService } from '../../../auth/auth-services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

private apiUrl = `${environment.api}/Account/change-password`;  
constructor(private http: HttpClient , private authService:AuthServiceService) {}

changePassword(model: any): Observable<any> {
  return this.http.post(`${this.apiUrl}`, model,{
    headers: this.authService.getHeaders()
  });
}

}
