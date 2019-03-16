import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Support } from './../model/support';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SupportService {

// URL to web api
private supportUrl = 'http://localhost:8000/api/supports';

constructor(
  private http: HttpClient
) { }

getTckSupports (): Observable<any[]> {
  return this.http.get<any[]>(this.supportUrl);
}

submitTicket (support: Support): Observable<Support> {
  return this.http.post<Support>(this.supportUrl, support, httpOptions);
}

}
