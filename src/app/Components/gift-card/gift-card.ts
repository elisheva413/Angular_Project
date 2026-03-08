import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gift-card',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gift-card.html',
  styleUrl: './gift-card.scss',
})
export class GiftCard {
  selectedDesign: string = 'gc1';
  selectedAmount: number = 300;
  
  designs = [
    { id: 'gc1', img: 'images/gift_card/gc1.webp' },
    { id: 'gc4', img: 'images/gift_card/gc4.webp' },
    { id: 'gc2', img: 'images/gift_card/gc2.webp' },
    { id: 'gc3', img: 'images/gift_card/gc3.webp' }
  ];

  amounts = [1000, 500, 300, 200, 150];

  // אובייקט טופס
  formData = {
    recipientName: '',
    recipientPhone: '',
    recipientEmail: '',
    date: '',
    time: '',
    greeting: '',
    sendSms: false,
    sendEmail: false,
    senderName: '',
    senderPhone: '',
    senderEmail: '',
    terms: false
  };

  selectDesign(id: string) {
    this.selectedDesign = id;
  }

  selectAmount(amount: number) {
    this.selectedAmount = amount;
  }

  onSubmit() {
    console.log('Order submitted:', {
      design: this.selectedDesign,
      amount: this.selectedAmount,
      details: this.formData
    });
    alert('ההזמנה הועברה לתשלום!');
  }
}




 
