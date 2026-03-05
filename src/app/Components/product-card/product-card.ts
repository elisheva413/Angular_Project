import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProductModel } from '../../Models/Products-Model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
// מוסיפים את OnChanges כדי להאזין לשינויים במוצר שמגיע מבחוץ
export class ProductCard implements OnChanges {
  @Input() product!: ProductModel;
  @Output() addToCart = new EventEmitter<ProductModel>();

  isAltImage = false;
  
  // במקום Getter, אנחנו מגדירים משתנה סטרינג רגיל!
  // שימי לב: שינינו כאן את הנתיב שיתאים לתיקיית public החדשה
  currentImageSrc = '/images/placeholder.png'; 

  // פונקציה מובנית של אנגולר שרצה כשה-@Input משתנה (כשהמוצר נטען)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.calculateImage(); // מחשבים את התמונה פעם אחת כשהמוצר מגיע
    }
  }

  onEnter() { 
    this.isAltImage = true; 
    this.calculateImage(); // מעדכנים תמונה במעבר עכבר
  }
  
  onLeave() { 
    this.isAltImage = false; 
    this.calculateImage(); // מעדכנים חזרה בעזיבת עכבר
  }

  onTouchToggle(event: TouchEvent) {
    event.preventDefault();
    this.isAltImage = !this.isAltImage;
    this.calculateImage(); // מעדכנים תמונה בלחיצת מסך מגע
  }

  onAddToCartClick(event: MouseEvent) {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  // זו הפונקציה שעושה את העבודה, אבל היא רצה *רק* כשאנחנו קוראים לה!
  private calculateImage(): void {
    if (!this.product) return;
    
    // לוקחים את הכתובת ישירות מה-DB
    const url = this.isAltImage && this.product.imgUrl2 
      ? this.product.imgUrl2 
      : this.product.imgUrl;

    // אם במקרה חסר נתון ב-DB, נציג תמונת גיבוי (מומלץ שתוודאי שיש כזו בתיקיית public/images)
    if (!url) {
      this.currentImageSrc = '/images/placeholder.png'; 
      return;
    }

    // אם זה לינק חיצוני (למשל משרת תמונות אחר), נשאיר כמו שהוא
    if (url.startsWith('http')) {
      this.currentImageSrc = url;
      return;
    }

    // כאן הקסם: מוודאים שיש לוכסן בהתחלה כדי להגיע ישירות לתיקיית public
    this.currentImageSrc = url.startsWith('/') ? url : `/${url}`;
  }
}