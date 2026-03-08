import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  // ודאי שהנתיב תואם לקונטרולר המשתמשים שלך ב-C#
  private apiUrl = 'https://localhost:44360/api/User'; 

  // כאן המקום הנכון לפונקציה הזו!
  updateUserDetails(userId: number, address: string, phone: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, { address, phone });
  }
}