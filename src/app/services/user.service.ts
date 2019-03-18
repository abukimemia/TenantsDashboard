import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8000/api/user';
  private propertyUrl = 'http://localhost:8080/api/propertyRooms/vacant';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<any> {
    return this.http.get(this.userUrl);
  }

  getVacantHouses(): Observable<any> {
    return this.http.get(this.propertyUrl);
  }
}
