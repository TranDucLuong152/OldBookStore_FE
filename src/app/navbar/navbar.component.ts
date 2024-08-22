import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Users } from '../entity/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  lastScrollTop = 0;
  isFixedShow = false;
  isFixedHide = false;
  isFixedTop = true;
  totalQuantity: number = 0;
  isAuthenticated: boolean = false;
  userName: string = '';
  user: Users | null = null; 

  constructor(private router: Router, private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserFromSession();
    this.updateCartStatus();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > this.lastScrollTop) {
      this.isFixedShow = false;
      this.isFixedHide = true;
      this.isFixedTop = false;
    } else {
      if (scrollTop === 0) {
        this.isFixedTop = true;
      } else {
        this.isFixedShow = true;
        this.isFixedHide = false;
        this.isFixedTop = false;
      }
    }
    this.lastScrollTop = scrollTop;
  }

  doSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
  }

  updateCartStatus() {
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  getUserFromSession() {
    const userData = sessionStorage.getItem('UserSession');
    if (userData) {
      this.user = JSON.parse(userData);
      this.isAuthenticated = true;   
      if (this.user) {
        this.userName = this.user.fullName || this.user.username || '';
      }
    }
  }
}
