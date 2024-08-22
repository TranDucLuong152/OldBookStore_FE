import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly USER_KEY = 'user'; // Key to store user data in localStorage

  constructor() { }

  
  setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  
  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  
  clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}
