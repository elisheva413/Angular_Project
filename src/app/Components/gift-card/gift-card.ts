import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../Services/cart-service';

@Component({
  selector: 'app-gift-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gift-card.html',
  styleUrl: './gift-card.scss',
})
export class GiftCard {
  private router = inject(Router);
  private cartService = inject(CartService);
  private http = inject(HttpClient);

  selectedDesign: string = 'gc1';
  selectedAmount: number = 300;
  isCustomAmount: boolean = false;
  customAmount: number | null = null;

  get effectiveAmount(): number {
    return this.isCustomAmount ? (this.customAmount || 0) : this.selectedAmount;
  }

  designs = [
    { id: 'gc1', img: 'images/gift_card/gc1.webp' },
    { id: 'gc4', img: 'images/gift_card/gc4.webp' },
    { id: 'gc2', img: 'images/gift_card/gc2.webp' },
    { id: 'gc3', img: 'images/gift_card/gc3.webp' }
  ];

  amounts = [1000, 500, 300, 200, 150];

  formData = {
    recipientName: '', recipientPhone: '', recipientEmail: '',
    date: '', time: '', greeting: '', sendSms: false,
    sendEmail: false, senderName: '', senderPhone: '',
    senderEmail: '', terms: false
  };

  selectDesign(id: string) { this.selectedDesign = id; }

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.isCustomAmount = false;
    this.customAmount = null;
  }

  selectCustomAmount() {
    this.isCustomAmount = true;
    this.selectedAmount = 0;
  }

  onSubmit() {
    if (!this.selectedDesign) return alert('אנא בחרי את עיצוב הכרטיס.');
    if (!this.effectiveAmount || this.effectiveAmount <= 0) return alert('אנא בחרי סכום לכרטיס.');
    if (this.isCustomAmount && (this.customAmount! < 50 || this.customAmount! > 5000)) return alert('הסכום חייב להיות בין 50 ל-5000 שקל.');
    if (!this.formData.recipientName?.trim()) return alert('אנא הכניסי את שם המקבל.');
    if (!this.formData.senderName?.trim()) return alert('אנא הכניסי את שם השולח.');
    if (!this.formData.sendSms && !this.formData.sendEmail) return alert('אנא בחרי לפחות אמצעי שליחה אחד (SMS או אימייל).');
    if (this.formData.sendEmail && !this.formData.recipientEmail?.trim()) {
      return alert('בחרת לשלוח באימייל, אנא הכניסי את כתובת האימייל של המקבל.');
    }
    if (!this.formData.terms) return alert('חובה לאשר את התקנון כדי להמשיך.');

    const amount = this.effectiveAmount;
    const actualSelectedImage = this.designs.find(d => d.id === this.selectedDesign)?.img || '';

    const giftCardItem = {
      productsId: this.getGiftCardDbId(amount),
      productsName: `Gift Card - ${this.formData.recipientName}`,
      price: amount,
      imgUrl: actualSelectedImage,
      quantity: 1,
      isDigital: true,
      categoryId: 140,
      productsDescreption: this.formData.greeting || 'כרטיס מתנה דיגיטלי',
      color: 'Multi',
      material: 'Digital',
      isActive: true,
      imgUrl2: ''
    };

    this.cartService.addToCart(giftCardItem as any);

    if (this.formData.sendEmail && this.formData.recipientEmail) {
      const emailData = {
        recipientEmail: this.formData.recipientEmail,
        recipientName: this.formData.recipientName,
        senderName: this.formData.senderName,
        greeting: this.formData.greeting,
        amount
      };
      sessionStorage.setItem('pendingGiftCardEmail', JSON.stringify(emailData));
    }

    this.router.navigate(['/checkout']);
  }

  getGiftCardDbId(amount: number): number {
    switch (amount) {
      case 150: return 321;
      case 200: return 322;
      case 300: return 323;
      case 500: return 324;
      case 1000: return 325;
      default: return 323; // ברירת מחדל לסכום מותאם
    }
  }
}
