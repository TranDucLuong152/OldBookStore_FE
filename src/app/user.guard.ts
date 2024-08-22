import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}
  canActivate(): boolean {
    const userData = sessionStorage.getItem('UserSession');
    if (userData) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { error: 'Bạn phải đăng nhập!' } });
      return false;
    }
  }
  
}
