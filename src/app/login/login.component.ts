import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { Users } from '../entity/users';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  user: Users[] = [];

  constructor(private authService: AuthService,private router: Router,private sessionService: SessionService) {}

  ngOnInit(): void {
    this.UserAuth();
  }

  UserAuth(): void {
    this.authService.getUsers().subscribe(
      data => {
        this.user = data;
      })    
  }

  login() {
    let loginSuccess = false;
    for (const user of this.user) {
      if (user.username === this.username && user.password === this.password) {
        loginSuccess = true;
        console.log('Login successful');
        sessionStorage.setItem('UserSession', JSON.stringify(user)); 
        this.sessionService.setUser(user)
        
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
        this.authService.login(user).subscribe(
          response => {   
        });
        break;
      }
    }

    if (!loginSuccess) {
      alert('Đăng nhập lỗi! hãy nhập lại tài khoản.');
    }
  }
}
