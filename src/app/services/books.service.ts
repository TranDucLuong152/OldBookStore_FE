import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Books } from '../entity/books';
import { map, Observable } from 'rxjs';
import { BookCategory } from '../entity/book-category';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl = 'http://localhost:8080/api/books';
  private baseUrlBook = 'http://localhost:8080/api/v1/books';
  private categoryUrl = 'http://localhost:8080/api/books-category';

  constructor(private httpClient: HttpClient) { }

  getBookList(): Observable<Books[]> {
    return this.httpClient.get<GetResponseBook>(this.baseUrl).pipe(map(response => response._embedded.books));
  }
  getBooks(size: number): Observable<Books[]> {
    return this.httpClient.get<GetResponseBook>(`${this.baseUrl}?size=${size}`)
    .pipe(map(response => response._embedded.books));
  }

  getBookPage(thePage: number, thePageSize: number): Observable<GetResponseBook> {
    return this.httpClient.get<GetResponseBook>(`${this.baseUrl}?page=${thePage}&size=${thePageSize}`);
  }

  getBookListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseBook> {
    const categoryUrl = `${this.baseUrl}/search/findByCategoryCategoryId?categoryId=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseBook>(categoryUrl);
  }

  searchBook(thePage: number, thePageSize: number,theKeyword: string): Observable<GetResponseBook> {
    const searchUrl = `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseBook>(searchUrl);
  }

  getBookCategories(): Observable<BookCategory[]> {
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(map(response => response._embedded.booksCategory));
  }

  getBook(theBookId: number): Observable<Books> {
    const bookUrl = `${this.baseUrl}/${theBookId}`;
    return this.httpClient.get<Books>(bookUrl);
  }
  

  addProduct(book:Books): Observable<any> {
    return this.httpClient.post(`${this.baseUrlBook}/addProduct`, book);
  }
  updateProduct(book:Books): Observable<any> {
    return this.httpClient.put(`${this.baseUrlBook}/updateProduct`, book);
  }
  deleteProduct(bookId: number): Observable<any> {
      return this.httpClient.delete(`${this.baseUrlBook}/${bookId}`);
  }
 
  
}

interface GetResponseBook {
  _embedded: {
    books: Books[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number;
  }
}

interface GetResponseBookCategory {
  _embedded: {
    booksCategory: BookCategory[];
  }
}
