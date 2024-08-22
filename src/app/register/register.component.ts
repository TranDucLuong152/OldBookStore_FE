import { Component, OnInit } from '@angular/core';
import { Users } from '../entity/users';
import { UserService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { Books } from '../entity/books';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Users = new Users();
  constructor(private userService: UserService,private router: Router) { }


  ngOnInit(): void {
  }
  messager: string ='';

  onSubmit(): void {
    this.user.role = false;
    this.userService.register(this.user).subscribe(response => {
      this.messager = 'Đăng ký thành công'; 
      this.router.navigate(['/login']);
    }, error => {
      this.messager = 'Đăng ký thất bại';
    });
  }


  // deleteUser(userId: number): void {
  //   this.userService.deleteUser(userId).subscribe(response => {
  //     this.messager = 'Xóa người dùng thành công';
  //   }, error => {
  //     this.messager = 'Xóa người dùng thất bại';
  //   });
  // }

}

