import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../../auth/auth-services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

private apiUrl = `${environment.api}/Blogs`;

constructor(private http: HttpClient , private authService :AuthServiceService) { }

getBlogs(): Observable<any> {
  return this.http.get<any>(this.apiUrl, {
    headers: this.authService.getHeaders()
  });
}
}
