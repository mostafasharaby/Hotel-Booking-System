import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../../../auth/auth-services/auth-service.service';
import { HandleErrorsService } from '../../../../shared/service/handle-errors.service';
import { Profile } from '../profile-model/profile';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  private apiGetUrl = `${environment.api}/Account/user-details`;  
  private apiUpdateUrl = `${environment.api}/Account/update-profile`;  


  constructor(private http: HttpClient ,
              private authService :AuthServiceService ,
              private handeErrorService :HandleErrorsService) {}
  
 
  getProfileDetails2(): Observable<any> {   
    return this.http.get<any>(this.apiGetUrl, {
      headers: this.authService.getHeaders()
    })
  }


  updateProfileDetails(profile: any): Observable<any> {
    const headers = this.authService.getHeaders();  
    return this.http.put<any>(`${this.apiUpdateUrl}`, profile, { headers ,responseType: 'text' as 'json' }).pipe(
      catchError(this.handeErrorService.handleError)
      
    );
  }



}
