import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../Services/cart-service';
import { OrderService } from '../../Services/order-service';
import { AuthService } from '../../Services/auth-service';
import { UserService } from '../../Services/user-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  cartItems: any[] = [];
  userAddress: string = '';
  userPhone: string = '';
  isSubmitting = false;

  // משתנים חדשים עבור ה-UI המעוצב (פנדורה)
  selectedPayment: string = 'credit'; // ברירת מחדל אשראי פתוח
  isSummaryOpen: boolean = true;      // סיכום הזמנה פתוח בהתחלה

  ngOnInit() {
    // 1. טעינת פריטים מהסל
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      console.log('הפריטים בסל לסיכום ההזמנה:', this.cartItems);
    });

    // 2. שימוש ב-AuthService (לפי ה-Mock שיצרנו)
    const userId = this.authService.getUserId();
    
    // כאן בהמשך תוכלי להוסיף שליפת כתובת מה-UserService אם תרצי להציג אותה
  }

  // פונקציה לשליטה באקורדיון של התשלום
  togglePayment(method: string) {
    this.selectedPayment = method;
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  placeOrder() {
    const userId = this.authService.getUserId();
    
    if (!this.authService.isLoggedIn()) {
      alert('נא להתחבר למערכת כדי להשלים את הרכישה');
      return;
    }

    // הפיכת הכפתור ל"טעינה" (וב-CSS הוא יהפוך לשחור)
    this.isSubmitting = true;

    // בניית האובייקט לפי הדרישות של ה-C#
    const newOrder = {
      orderDate: new Date().toISOString().split('T')[0],
      orderSum: this.getTotalPrice(),
      userId: userId,
      orderStatus: 'Paid', 
      ordersItems: this.cartItems.map(item => ({
        productsId: item.product.productsId, // שימי לב שהשם תואם ל-DTO שלך
        quantity: item.selectedQuantity
      }))
    };

    // שליחה לשרת
    this.orderService.createOrder(newOrder).subscribe({
      next: (res) => {
        alert('התשלום עבר בהצלחה! תודה שקנית בפנדורה');
        this.cartService.clearCart(); // מנקה את הסל (הפונקציה שהוספנו לסרביס)
        this.router.navigate(['/personal-area/history']); // מעבר להיסטוריית הזמנות עם הסטפר
      },
      error: (err) => {
        console.error('שגיאה ביצירת הזמנה:', err);
        alert('חלה שגיאה בעיבוד התשלום, נסי שוב מאוחר יותר');
        this.isSubmitting = false;
      }
    });
  }
}