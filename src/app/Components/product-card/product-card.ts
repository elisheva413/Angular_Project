// import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ButtonModule } from 'primeng/button';
// import { ProductModel } from '../../Models/Products-Model';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-product-card',
//   standalone: true,
//   imports: [CommonModule, ButtonModule,RouterModule],
//   templateUrl: './product-card.html',
//   styleUrl: './product-card.scss',
// })
// // מוסיפים את OnChanges כדי להאזין לשינויים במוצר שמגיע מבחוץ
// export class ProductCard implements OnChanges {
//   @Input() product!: ProductModel;
//   @Output() addToCart = new EventEmitter<ProductModel>();

//   isAltImage = false;
  
//   // במקום Getter, אנחנו מגדירים משתנה סטרינג רגיל!
//   // שימי לב: שינינו כאן את הנתיב שיתאים לתיקיית public החדשה
//   currentImageSrc = '/images/placeholder.png'; 

//   // פונקציה מובנית של אנגולר שרצה כשה-@Input משתנה (כשהמוצר נטען)
//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['product']) {
//       this.calculateImage(); // מחשבים את התמונה פעם אחת כשהמוצר מגיע
//     }
//   }

//   onEnter() { 
//     this.isAltImage = true; 
//     this.calculateImage(); // מעדכנים תמונה במעבר עכבר
//   }
  
//   onLeave() { 
//     this.isAltImage = false; 
//     this.calculateImage(); // מעדכנים חזרה בעזיבת עכבר
//   }

//   onTouchToggle(event: TouchEvent) {
//     event.preventDefault();
//     this.isAltImage = !this.isAltImage;
//     this.calculateImage(); // מעדכנים תמונה בלחיצת מסך מגע
//   }

//   onAddToCartClick(event: MouseEvent) {
//     event.stopPropagation();
//     this.addToCart.emit(this.product);
//   }

//   // זו הפונקציה שעושה את העבודה, אבל היא רצה *רק* כשאנחנו קוראים לה!
//   private calculateImage(): void {
//     if (!this.product) return;
    
//     // לוקחים את הכתובת ישירות מה-DB
//     const url = this.isAltImage && this.product.imgUrl2 
//       ? this.product.imgUrl2 
//       : this.product.imgUrl;

//     // אם במקרה חסר נתון ב-DB, נציג תמונת גיבוי (מומלץ שתוודאי שיש כזו בתיקיית public/images)
//     if (!url) {
//       this.currentImageSrc = '/images/placeholder.png'; 
//       return;
//     }

//     // אם זה לינק חיצוני (למשל משרת תמונות אחר), נשאיר כמו שהוא
//     if (url.startsWith('http')) {
//       this.currentImageSrc = url;
//       return;
//     }

//     // כאן הקסם: מוודאים שיש לוכסן בהתחלה כדי להגיע ישירות לתיקיית public
//     this.currentImageSrc = url.startsWith('/') ? url : `/${url}`;
//   }
// }

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductModel } from '../../Models/Products-Model';
import { CartService } from '../../Services/cart-service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule], // ניקינו את ButtonModule
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard implements OnChanges {
  private cartService = inject(CartService);
  
  private cdr = inject(ChangeDetectorRef);
  @Input() product!: ProductModel;
  @Output() addToCart = new EventEmitter<ProductModel>();

  isAltImage = false;
  currentImageSrc = '/images/placeholder.png'; 
  isAddedToCart = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) { this.calculateImage(); }
  }

  onEnter() { this.isAltImage = true; this.calculateImage(); }
  onLeave() { this.isAltImage = false; this.calculateImage(); }
  onTouchToggle(event: TouchEvent) {
    this.isAltImage = !this.isAltImage;
    this.calculateImage();
  }

  onAddToCartClick(event: MouseEvent) {
    event.stopPropagation(); // מונע ניווט לדף מוצר
    if (this.product) {
      this.cartService.addToCart(this.product, 1);
      
      // 2. מפעילים את האנימציה הוורודה
      this.isAddedToCart = true;
      
      // 3. מכבים אותה אחרי 800 מילי-שניות (קצת פחות משנייה)
      setTimeout(() => {
        this.isAddedToCart = false;
        this.cdr.detectChanges();
       
      }, 400);
    }
  }

  private calculateImage(): void {
    if (!this.product) return;
    const url = this.isAltImage && this.product.imgUrl2 ? this.product.imgUrl2 : this.product.imgUrl;
    if (!url) { this.currentImageSrc = '/images/placeholder.png'; return; }
    this.currentImageSrc = url.startsWith('http') ? url : (url.startsWith('/') ? url : `/${url}`);
  }
}