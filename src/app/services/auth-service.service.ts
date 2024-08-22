import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Users } from '../entity/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/users';
  private apiUrl = 'http://localhost:8080/api/login';
  constructor(private httpClient: HttpClient) { }
  

  login(user: Users): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, user);
  }

  getUsers(): Observable<Users[]> {
    return this.httpClient.get<GetResponseUser>(this.baseUrl).pipe(
      map(response => response._embedded.users)
    );
  }
}

interface GetResponseUser {
  _embedded: {
    users: Users[];
  };
}
