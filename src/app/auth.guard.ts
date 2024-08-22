import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) {}
  canActivate(): boolean {
    const user = this.sessionService.getUser();
    const userData = sessionStorage.getItem('UserSession');
    if (userData && user.role === true) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { error: 'Bạn không phải ADMIN!' } });
      return false;
    }
  }
  
}
