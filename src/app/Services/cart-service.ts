import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../Models/Cart-Model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  // טעינה מה-LocalStorage או טעינת מערך דוגמה אם הסל ריק
  private loadFromStorage() {
    const savedCart = localStorage.getItem('p_cart');
    
    if (savedCart && JSON.parse(savedCart).length > 0) {
      this.cartItems = JSON.parse(savedCart);
    } else {
     
      this.cartItems = [
        { 
          productId: 1, 
          productName: 'צמיד Pandora Moments', 
          price: 299, 
          imgUrl: 'bracelet1.png', 
          selectedQuantity: 1 
        },
        { 
          productId: 2, 
          productName: "צ'ארם לב כסף סטרלינג", 
          price: 159, 
          imgUrl: 'charm1.png', 
          selectedQuantity: 2 
        }
      ];
      this.saveToStorage();
    }
    this.cartSubject.next([...this.cartItems]);
  }

  private saveToStorage() {
    localStorage.setItem('p_cart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
  }


  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.productId === product.productId);
    if (existingItem) {
      existingItem.selectedQuantity++;
    } else {
      this.cartItems.push({
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        imgUrl: product.imgUrl,
        selectedQuantity: 1
      });
    }
    this.saveToStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(i => i.productId === productId);
    if (item && quantity > 0) {
      item.selectedQuantity = quantity;
      this.saveToStorage();
    }
  }

  removeItem(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.saveToStorage();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.selectedQuantity), 0);
  }

  getCartCount(): number {
    return this.cartItems.reduce((count, item) => count + item.selectedQuantity, 0);
  }
}