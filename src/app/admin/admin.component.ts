import { Component, OnInit } from '@angular/core';
import { Books } from '../entity/books';
import { BooksService } from '../services/books.service';
import { BookCategory } from '../entity/book-category';
import { Users } from '../entity/users';
import { UserService } from '../services/user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: Users = new Users();
  book: Books = new Books();
  userForm: FormGroup;
  bookForm: FormGroup;
  categories: BookCategory[] = [];
  message: string = '';
  books: Books[]= [];
  users: Users[]= [];
  constructor(
    private bookService: BooksService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      bookId: [{ value: '', disabled: true }],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      publicationDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      stockQuantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      coverImage: ['', [Validators.required, Validators.pattern(/^.+\.(jpg|jpeg|png|gif)$/)]],
      description: [''],
      categoryId: ['', [Validators.required]] // Added required validator for categoryId
    });
    

    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.listBooks();
    this.listUser();
  }
  listBooks(){
    this.bookService.getBooks(100).subscribe(
      data =>{
        this.books = data;
      }
    )
  }
  listUser(){
    this.userService.getUsers().subscribe(
      data =>{
        this.users = data;
      }
    )
  }
  loadCategories() {
    this.bookService.getBookCategories().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  addProduct() {
    console.log(this.bookForm.value);
  
    if (this.bookForm.valid) {
      this.book = this.bookForm.getRawValue(); 
      this.bookService.addProduct(this.book).subscribe(response => {
        this.message = 'Thêm thành công';
        console.log('Product added successfully');
        this.listBooks();
        this.resetFormBook();
      });
    } else {
      this.message = 'Thêm thất bại, hãy nhập đúng các thành phần!';
      console.log('Book form is invalid', this.bookForm.errors); // Log errors
    }
  }
  

  updateProduct() {
    if (this.bookForm.valid) {
      this.book = this.bookForm.value;
      this.bookService.updateProduct(this.book).subscribe(response => {
        console.log('Product updated successfully');
      });
    } else {
      console.log('Book form is invalid');
    }
  }

  deleteProduct() {
    if (this.book.bookId) {
      this.bookService.deleteProduct(this.book.bookId).subscribe(response => {
        console.log('Product deleted successfully');
        this.resetFormBook();
      });
    } else {
      console.log('Book ID is required to delete product');
    }
  }

  

  // activateTab(tabId: string) {
  //   const tabElement = document.getElementById(tabId);
  //   if (tabElement) {
  //     const tab = new bootstrap.Tab(tabElement);
  //     tab.show();
  //   } else {
  //     console.error(`Element with id ${tabId} not found.`);
  //   }
  // }
  editBook(book: any) {
    this.bookForm.patchValue(book);
    // activateTab('home-tab');
  }
  deleteBook(bookId: number) { 
      this.bookService.deleteProduct(bookId).subscribe(response => {
        console.log('Product deleted successfully');
        this.listBooks();

      });
    
  }
  editUser(user: any) {
    this.userForm.patchValue(user);
    // activateTab('home-tab');
  }
  RemoveUser(userId: any) { 
      this.userService.deleteUser(userId).subscribe(response => {
        console.log('Product deleted successfully');
        this.listUser();

      });
    
  }

  resetFormBook() {
    this.bookForm.reset();
    this.book = new Books();
  }

  handleFileInputBook(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bookForm.patchValue({
        coverImage: file.name 
      });
    }
  }
  

  registerUser() {
    if (this.userForm.valid) {
      this.user = this.userForm.value;
      this.userService.register(this.user).subscribe(
        response => {
          this.message = 'thêm thành công'
          console.log('User registered successfully', response);
          this.listUser();
          this.resetFormUser();
        },
        error => {
          this.message = 'thêm thất bại'
          console.error('Error registering user:', error);
        }
      );
    } else {
      this.message = 'thêm thất bại'
      console.log('User form is invalid');
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      this.user = this.userForm.value;
      this.userService.updateUser(this.user).subscribe(
        response => {
          console.log('User updated successfully');
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.log('User form is invalid');
    }
  }

  deleteUser() {
    if (this.user.username) {
      this.userService.deleteUser(this.user.username).subscribe(
        response => {
          console.log('User deleted successfully');
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    } else {
      console.log('Username is required to delete user');
    }
  }

  resetFormUser() {
    this.userForm.reset();
    this.user = new Users();
  }
}
