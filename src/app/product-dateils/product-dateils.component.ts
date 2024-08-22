import { Component, OnInit } from '@angular/core';
import { Books } from '../entity/books';
import { BooksService } from '../services/books.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../entity/cart-item';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-dateils',
  templateUrl: './product-dateils.component.html',
  styleUrls: ['./product-dateils.component.css']
})
export class ProductDateilsComponent implements OnInit {
  book!: Books;

  constructor(private booksService: BooksService,private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleBookDetail();
    });
  }

  handleBookDetail() {
    const theBookId = this.route.snapshot.paramMap.get('bookid');
    if (theBookId != null) {
      this.booksService.getBook(+theBookId).subscribe( 
        data => this.book = data,
        error => console.error('Error fetching book details:', error)
      );
    }
  }
  addToCart(book: Books) {
    const theCartItem = new CartItem(book);
    this.cartService.addToCart(theCartItem);
  }
}
