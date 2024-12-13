import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AuthServiceService } from '../../auth-services/auth-service.service';
import { HandleErrorsService } from '../../../../shared/service/handle-errors.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotServiceService {

  private apiUrl =  `${environment.api}/Account`; 
  
  constructor(private http: HttpClient , private authService :AuthServiceService , private handeErrorService:HandleErrorsService) {}

  // Forget Password
  forgetPassword(email: string): Observable<any> {
    const payload = { email };
    const headers = this.authService.getHeaders();  
    console.log(JSON.stringify(payload));
    return this.http.post(`${this.apiUrl}/forgot-password`, payload, { headers }).pipe(
      catchError(this.handeErrorService.handleError)
    );     
  }

  

}
