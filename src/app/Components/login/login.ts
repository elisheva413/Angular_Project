import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { UserService } from '../../Services/user.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink,
    InputTextModule, 
    PasswordModule, 
    ButtonModule, 
    FloatLabelModule,
    DividerModule,
    RadioButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  loginData = {
    email: '',
    password: ''
  };

  userType: string = 'user';

  ngOnInit() {
    this.loginData = { email: '', password: '' };
  }

 onLogin() {
  if (!this.loginData.email || !this.loginData.password) {
    alert('נא למלא אימייל וסיסמה');
    return;
  }

  this.userService.login(this.loginData).subscribe({
    next: (res) => {
      if (!res) {
        alert('שגיאה בנתוני המשתמש');
        return;
      }

          
      const serverRole = (res?.Role || res?.role || "").toLowerCase().trim();

      if (serverRole === 'admin') {
        localStorage.setItem('userRole', 'Admin');
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigate(['/admin']); 
      } else {
        localStorage.setItem('userRole', 'User');
        const userToSave = {
          id: res.id || res.Id,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          phone: res.phone,
          address: res.address
        };
        localStorage.setItem('currentUser', JSON.stringify(userToSave));
        this.router.navigate(['/products']); 
      }
    },
    error: (err) => {
      console.error('שגיאה בחיבור:', err);
      alert(err.status === 401 ? 'אימייל או סיסמה שגויים' : 'שגיאת שרת');
    }
  });
}}