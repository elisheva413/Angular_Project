import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

import { UserService } from '../../Services/user.service'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink,
    InputTextModule, 
    PasswordModule, 
    ButtonModule, 
    FloatLabelModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'] 
})
export class RegisterComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  registerData = {
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    Phone: '',
    Address: '',
    Role: 'User'
  };

  onRegister() {
    // ולידציה בסיסית - מוודאים שהשדות החשובים מלאים
    if (!this.registerData.Email || !this.registerData.Password || !this.registerData.Phone) {
        alert('נא למלא את כל השדות, כולל טלפון וכתובת');
        return;
    }
    
    console.log('מנסה להירשם עם:', this.registerData);
    
    this.userService.addUser(this.registerData).subscribe({
      next: (res: any) => {
        console.log('ההרשמה הצליחה!', res);
        
        // --- יצירת אובייקט נקי ללוקאל סטורג' (בדיוק כמו בלוגין, ובלי הסיסמה!) ---
        const userToSave = {
          // מנסה למשוך את ה-ID שחזר מהשרת (תלוי אם הוא מחזיר id או Id)
          id: res?.id || res?.Id, 
          firstName: this.registerData.FirstName,
          lastName: this.registerData.LastName,
          email: this.registerData.Email,
          phone: this.registerData.Phone,
          address: this.registerData.Address
        };

        localStorage.setItem('currentUser', JSON.stringify(userToSave));
        localStorage.setItem('userRole', 'User');
        
        alert('נרשמת בהצלחה! מעביר אותך לחנות...');
        this.router.navigate(['/products']); 
      },
      error: (err) => {
        console.error('שגיאה בהרשמה:', err);
        alert('משהו השתבש... בדקי שה-API דלוק ושכל השדות מלאים');
      }
    });
  }
}