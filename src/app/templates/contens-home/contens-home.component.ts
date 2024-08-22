import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/entity/books';
import { CartItem } from 'src/app/entity/cart-item';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from '../../services/cart.service';



@Component({
  selector: 'app-contens-home',
  templateUrl: './contens-home.component.html',
  styleUrls: ['./contens-home.component.css']
})
export class ContensHomeComponent implements OnInit {
  book!: Books;
  books: Books[]= [];
  constructor(private booksService: BooksService,private cartService: CartService) { }

  ngOnInit(): void {
    this.listBooks();
  }
  listBooks(){
    this.booksService.getBookList().subscribe(
      data =>{
        this.books = data;
      }
    )
  }
  addToCart(book: Books) {
    const theCartItem = new CartItem(book);
    this.cartService.addToCart(theCartItem);
  }
}
