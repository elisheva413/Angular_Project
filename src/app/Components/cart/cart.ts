import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // הוספנו Router
import { CartService } from '../../Services/cart-service'; 
import { CartItem } from '../../Models/Cart-Model'; 
import { AuthService } from '../../Services/auth-service'; // הוספנו את ה-AuthService

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  private cartService = inject(CartService);
  private authService = inject(AuthService); // הזרקה של שירות האימות
  private router = inject(Router); // הזרקה של הנתב
  
  cartItems: CartItem[] = [];

  readonly shippingThreshold = 299;
  readonly shippingCost = 39.90;

  ngOnInit() {
    this.cartService.cart$.subscribe(items => this.cartItems = items);
  }

  // --- לוגיקת המעבר לתשלום ---
  proceedToCheckout() {
    if (this.authService.isLoggedIn()) {
      // אם מחוברת - עוברים לדף התשלום המעוצב שלנו
      this.router.navigate(['/checkout']);
    } else {
      // אם לא מחוברת - עוברים לדף ההתחברות (של חברה שלך)
      // הערה: תוכלי להוסיף כאן הודעה קופצת (Toast/Alert) "יש להתחבר כדי להמשיך"
      this.router.navigate(['/login']); 
    }
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

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  getShippingCost(): number {
    return this.getTotalPrice() >= this.shippingThreshold ? 0 : this.shippingCost;
  }

  getFinalTotal(): number {
    return this.getTotalPrice() + this.getShippingCost();
  }
}
