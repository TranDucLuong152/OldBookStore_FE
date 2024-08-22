import { Component, OnInit } from '@angular/core';
import { Users } from '../entity/users';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: Users = new Users();
  userForm: FormGroup;

  constructor(
    private router: Router, 
    private http: HttpClient,
    private userService: UserService,
    private sessionService: SessionService, 
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      username: [{ value: '', disabled: true }, [Validators.required]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUserFromSession();
  }

  getUserFromSession() {
    const userData = sessionStorage.getItem('UserSession');
    if (userData) {
      this.user = JSON.parse(userData);

      // Populate the form with user data
      this.userForm.patchValue({
        username: this.user.username,
        password: this.user.password,
        fullName: this.user.fullName,
        address: this.user.address,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        role: this.user.role
      });
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      const updatedUser = { ...this.userForm.value, username: this.user.username };
      this.userService.updateUser(updatedUser).subscribe(
        response => {
          console.log('User updated successfully');
          this.logout();
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.log('User form is invalid');
    }
  }

  logout() {
    sessionStorage.removeItem('UserSession');
    sessionStorage.removeItem('cart');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
