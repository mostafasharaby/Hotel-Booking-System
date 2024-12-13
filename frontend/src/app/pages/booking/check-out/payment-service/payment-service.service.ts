import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { invoiceGuest } from '../check-out-model/check';
import { AuthServiceService } from '../../../auth/auth-services/auth-service.service';
import { HandleErrorsService } from '../../../../shared/service/handle-errors.service';
@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  private apiUrl = `${environment.api}/InvoiceGuests`;  

  constructor(private http: HttpClient ,
              private authService :AuthServiceService ,
              private handeErrorService :HandleErrorsService) {}

  postInvoiceGuest(invoiceGuest:invoiceGuest): Observable<invoiceGuest> {
    //return this.http.post<invoiceGuest>(this.apiUrl, invoiceGuest);
    const headers = this.authService.getHeaders();  
    return this.http.post<invoiceGuest>(this.apiUrl, invoiceGuest, { headers }).pipe(
      catchError(this.handeErrorService.handleError)
    );
  }

}
