import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../Models/Order-Model'; // ודאי שהנתיב נכון

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:44360/api/Order'; // החליפי בפורט ובנתיב המדויק שלך

  // 1. יצירת הזמנה חדשה (בזמן Checkout)
  createOrder(order: any): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  // 2. הבאת היסטוריית הזמנות של לקוח (לאזור האישי)
  getUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  // 3. הבאת כל ההזמנות (עבור המנהל)
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/all`);
  }

  // 4. עדכון סטטוס הזמנה (למנהל או לאישור קבלה של לקוח)
  updateOrderStatus(orderId: number, newStatus: string): Observable<Order> {
    // שליחת הסטטוס כ-Body במירכאות כי השרת מצפה ל-string
    return this.http.put<Order>(`${this.apiUrl}/${orderId}/status`, `"${newStatus}"`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}