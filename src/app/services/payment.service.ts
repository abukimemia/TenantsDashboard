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

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  submitPayment(info: any): Observable<any> {
    const url = `${this.baseUrl}/payment`;
    return this.http.post<any>(url, info, httpOptions);
  }

  getUserPayment(): Observable<any> {
    const url = `${this.baseUrl}/user/payment`;
    return this.http.get<any>(url);
  }
}
