import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  private isLoggedSubject: BehaviorSubject<boolean>;
  constructor(private http: HttpClient) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn);
  }
  private loginUrl = `${environment.api}/Account/login`;
  private registerUrl = `${environment.api}/Account/register`;
  private userUrl = '';
  usernameTakenError: boolean = false;
  private username: string | null = null;

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };

    return this.http.post<any>(this.loginUrl, loginData).pipe(
      tap((response: any) => {
        console.log("response token: " + response.token);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.isLoggedSubject.next(true);
          this.username = this.getUsernameFromToken();
          console.log("username", this.username , );
          // const decodedToken = jwtDecode(response.token) as any;
          // console.log("decodedToken ", JSON.stringify(decodedToken));
        }
      })
    );
  }

  register(userName: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const registerData = { userName, email, password, confirmPassword };

    return this.http.post<any>(this.registerUrl, registerData).pipe(
      tap((response: any) => {
        //console.log('User registered successfully:', response);
      }),
      catchError((error: any) => {
        if (error.status === 400 && error.error.includes("Username")) {
          this.usernameTakenError = true;
        }
        return throwError(() => new Error(error));
      })
    );
  }

  logout() {
    this.isLoggedSubject.next(false);
    localStorage.removeItem('token');     
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.userUrl}v1/auth/profile`);
  }


  get isUserLoggedIn(): boolean {
    return (localStorage.getItem('token')) ? true : false;
  }

  getloggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }



  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token) as any;
      //console.log("decodedToken ", JSON.stringify(decodedToken));
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin';
    }
    return false;
  }

  getUsernameFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token) as any;
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
    return null;
  }

  public getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }


}
