import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {
  isVisible: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 20) {
      this.isVisible = true;
    } else if (this.isVisible && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 20)) {
      this.isVisible = false;
    }
  }

  constructor() { }

  ngOnInit(): void { }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
