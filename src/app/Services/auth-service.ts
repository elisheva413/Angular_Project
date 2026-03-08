import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // נתוני דמה לצורך פיתוח - נניח שמשתמש מס' 1 מחובר
  private mockUser = {
    userId: 1,
    userName: 'משתמש בדיקה',
    isAdmin: false
  };

  getUserId(): number {
    return this.mockUser.userId;
  }

  isLoggedIn(): boolean {
    return true; // נחזיר תמיד אמת כדי שתוכלי לראות את דף התשלום
  }
}