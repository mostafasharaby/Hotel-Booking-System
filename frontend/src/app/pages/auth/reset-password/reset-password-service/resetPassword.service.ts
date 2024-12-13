import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HandleErrorsService } from '../../../../shared/service/handle-errors.service';
import { AuthServiceService } from '../../auth-services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private apiUrl = 'http://localhost:5004/api/Account';

  constructor(private http: HttpClient,
              private authService :AuthServiceService,
              private handeErrorService:HandleErrorsService
              ) {}


  resetPassword(email: string, token: string, newPassword: string): Observable<any> {
    const payload = { email, token, newPassword };
    const headers = this.authService.getHeaders();  
    return this.http.post(`${this.apiUrl}/reset-password`, payload, { headers }).pipe(
      catchError(this.handeErrorService.handleError)
    );     
  }

}
