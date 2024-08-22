import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from 'src/app/entity/books';
import { BooksService } from 'src/app/services/books.service';
import { BookCategory } from '../entity/book-category';
import { CartItem } from '../entity/cart-item';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  bookcategories: BookCategory[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  books: Books[] = [];
  filteredBooks: Books[] = [];
  rangeValue: number = 0;
  maxPrice: number = 100;
  size: number = 0;
  thePageNumber: number = 1;
  thePageSize: number = 9;
  theTotalElements: number = 0;
  tempBook!: Books;
  constructor(private booksService: BooksService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.listBookCategories();
    this.route.paramMap.subscribe(() => {
      this.listBooks();
    });
  }

  listBooks() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const theKeyword = this.route.snapshot.paramMap.get('keyword');

    if (theKeyword != null) {
      this.booksService.searchBook(this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe(
        data => {
          this.books = data._embedded.books;
          this.filteredBooks = data._embedded.books;
          this.thePageNumber = data.page.number + 1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
          this.size = this.filteredBooks.length;
        }
      );
    } else {
      if (idParam == null) {
        this.booksService.getBookPage(this.thePageNumber - 1, this.thePageSize).subscribe(
          data => {
            this.books = data._embedded.books;
            this.filteredBooks = data._embedded.books;
            this.thePageNumber = data.page.number + 1;
            this.thePageSize = data.page.size;
            this.theTotalElements = data.page.totalElements;
            this.size = this.filteredBooks.length;
          },
          error => {
            console.error('Lỗi khi nạp danh sách sách', error);
          }
        );
      } else {
        this.currentCategoryId = idParam ? +idParam : 1;
        this.booksService.getBookListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(
          data => {
            this.books = data._embedded.books;
            this.filteredBooks = data._embedded.books;
            this.thePageNumber = data.page.number + 1;
            this.thePageSize = data.page.size;
            this.theTotalElements = data.page.totalElements;
            this.size = this.filteredBooks.length;
          },
          error => {
            console.error('Lỗi khi tìm nạp danh sách sách', error);
          }
        );
      }
    }
  }

  listBookCategories() {
    this.booksService.getBookCategories().subscribe(
      data => {
        this.bookcategories = data;
      }
    );
  }

  updatePrice() {
    this.maxPrice = this.rangeValue * 100;
    this.filteredBooks = this.books.filter(book => {
      if (typeof book.price !== 'number') {
        console.warn(`Giá sách không phải là con số: ${book.price}`);
        return false;
      }
      return book.price <= this.maxPrice;
    });
    this.size = this.filteredBooks.length;
  }

  doSearch(value: string) {
    this.router.navigateByUrl(`/search/${value}`);
  }

  addToCart(book: Books) {
    const theCartItem = new CartItem(book);
    this.cartService.addToCart(theCartItem);
  }

}
