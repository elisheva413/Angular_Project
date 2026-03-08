import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44382/api/Users';

  constructor(private http: HttpClient) { }
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        if (user && user.id) {
          localStorage.setItem('userId', user.id.toString());
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }


  getCurrentUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id) : null;
  }

  logout(): void {
    localStorage.removeItem('userId');
  }

  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, user: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }
}