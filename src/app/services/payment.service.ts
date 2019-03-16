import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentReportUrl = 'http://localhost:8000/api/payment';

  constructor(private http: HttpClient) { }

  submitPayment(info: any): Observable<any> {
    return this.http.post<any>(this.paymentReportUrl, info, httpOptions);
  }
}
