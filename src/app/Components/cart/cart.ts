import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../Services/cart-service'; 
import { CartItem } from '../../Models/Cart-Model'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // נקי לגמרי!
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  private cartService = inject(CartService);
  cartItems: CartItem[] = [];

  // הגדרות משלוח
  readonly shippingThreshold = 299;
  readonly shippingCost = 39.90;

  ngOnInit() {
    this.cartService.cart$.subscribe(items => this.cartItems = items);
  }

  getProductImagePath(item: CartItem): string {
    const url = item.product.imgUrl;
    if (!url) return 'assets/images/placeholder.png';
    return url.startsWith('/') ? url : `/${url}`;
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
  }

  // סכום הביניים (רק המוצרים)
  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  // חישוב עלות המשלוח
  getShippingCost(): number {
    return this.getTotalPrice() >= this.shippingThreshold ? 0 : this.shippingCost;
  }

  // סכום סופי לתשלום (מוצרים + משלוח)
  getFinalTotal(): number {
    return this.getTotalPrice() + this.getShippingCost();
  }
}