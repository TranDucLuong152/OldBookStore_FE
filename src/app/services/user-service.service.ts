import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Users } from '../entity/users';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }
  getUsers(): Observable<Users[]> {
    return this.http.get<GetResponseUser>(this.baseUrl).pipe(
      map(response => response._embedded.users)
    );
  }
  register(user: Users): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
  
  updateUser(user: Users): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateUser`, user);
  }
  deleteUser(userId: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${userId}`);
  }

}

interface GetResponseUser {
  _embedded: {
    users: Users[];
  };
}