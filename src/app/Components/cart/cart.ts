import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartService } from '../../Services/cart-service'; 
import { CartItem } from '../../Models/Cart-Model'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputNumberModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  private cartService = inject(CartService);
  
  cartItems: CartItem[] = [];

  ngOnInit() {
    this.cartService.cart$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
    });
  }
  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }


  removeItem(productId: number) {
    this.cartService.removeItem(productId);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
  // הוסיפי את הפונקציה הזו בתוך ה-class של Cart
getProductImagePath(item: any): string {
  // item כאן הוא המוצר שנמצא בתוך העגלה
  const raw = item.imgUrl || item.product?.imgUrl; 
  
  if (!raw) return 'assets/images/no-image.png'; 

  let imgPath = raw.trim().replace(/\\/g, '/');

  if (imgPath.startsWith('http')) return imgPath;

  if (!imgPath.startsWith('/')) {
    imgPath = '/' + imgPath;
  }

  return imgPath; 
}
}