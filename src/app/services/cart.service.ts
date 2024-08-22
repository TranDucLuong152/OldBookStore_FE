import { Injectable } from '@angular/core';
import { CartItem } from '../entity/cart-item';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor(private HttpClientt: HttpClient) { 
    this.loadCartFromSession();
  }

  addToCart(theCartItem: CartItem) {
    let isCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItem.length > 0) {
      existingCartItem = this.cartItem.find(tempCartItem => tempCartItem.id === theCartItem.id);   
      isCart = (existingCartItem != undefined);
    }

    if (isCart) {
      existingCartItem!.quantity++;
    } else {
      this.cartItem.push(theCartItem);
    }

    this.computeCartTotals();
    this.saveCartToSession();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (const currentCartItem of this.cartItem) {
      totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    for (const tempCartItem of this.cartItem) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`${subTotalPrice} , ${tempCartItem.quantity},  ${tempCartItem.unitPrice}, ${tempCartItem.name}`);
    }
  }

  saveCartToSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.cartItem));
  }


  loadCartFromSession() {
    const cartData = sessionStorage.getItem('cart');
    if (cartData) {
      this.cartItem = JSON.parse(cartData);
      this.computeCartTotals();
    }
  }
}
