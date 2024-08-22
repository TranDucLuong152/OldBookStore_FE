import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../entity/cart-item';
import { Books } from '../entity/books';
import { Users } from '../entity/users';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  cartItem: CartItem[] = [];
  book!: Books;
  totalPrice: number = 0.0;
  totalQuantity: number = 0;
  user: Users | null = null;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
   
    this.listCartdetails();
  }


  thongbao() {
    alert("Hãy đăng nhập để thanh toán");
  }

  listCartdetails() {
    this.cartItem = this.cartService.cartItem;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();
  }

  addQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  subtractQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 0) {
      cartItem.quantity--;
      this.cartService.computeCartTotals();
    } else {
      this.remove(cartItem);
    }
  }

  remove(cartItem: CartItem) {
    const indexItem = this.cartItem.findIndex(tempCartItem => tempCartItem.id === cartItem.id);

    if (indexItem > -1) {
      this.cartItem.splice(indexItem, 1);
      this.cartService.computeCartTotals();
    }
  }
}
