import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; // <-- הוספנו את הראוטר לינק לניווט
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../Services/user.service';

@Component({ 
  selector: 'app-profile',
  standalone: true,
  // הוספנו את RouterLink למערך הייבוא
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, ToastModule, RouterLink],
  providers: [MessageService],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'] 
})
export class ProfileComponent implements OnInit {
  private messageService = inject(MessageService);
  private userService = inject(UserService); 

  isLoggedIn: boolean = false; // <-- משתנה שבודק אם המשתמש מחובר

  userData: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  };

  private userId!: number;

  ngOnInit() {
    const storedUserStr = localStorage.getItem('currentUser');
    
    if (storedUserStr) {
      this.isLoggedIn = true; // יש משתמש מחובר
      const storedUser = JSON.parse(storedUserStr);
      this.userId = storedUser.id;
      
      this.userData = {
        firstName: storedUser.firstName || '',
        lastName: storedUser.lastName || '',
        email: storedUser.email || '',
        phone: storedUser.phone || '',
        address: storedUser.address || ''
      };
    } else {
      this.isLoggedIn = false; 
      this.messageService.add({ severity: 'warn', summary: 'התראה', detail: 'לא נמצאו פרטים. אנא התחברי מחדש.' });
    }
  }

  onSave() {
    const currentStoredUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const updatedUserForLocal = {
      ...currentStoredUser, 
      id: this.userId,      
      ...this.userData      
    };
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUserForLocal));
    
    this.userService.updateUser(this.userId, this.userData).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'נשמר!', detail: 'הפרטים שלך עודכנו בהצלחה.' });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'לא הצלחנו לעדכן את הפרטים שלך בשרת.' });
      }
    });
  }
}