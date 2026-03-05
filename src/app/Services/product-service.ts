import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable, map } from 'rxjs';
import { Observable, map, tap, catchError, throwError } from 'rxjs';
import { ProductModel } from '../Models/Products-Model';

// התאמה למבנה שהשרת מחזיר
export type ProductsResponse = {
  items: ProductModel[];     // שונה מ-products ל-items
  totalCount: number;        // שונה מ-total ל-totalCount
  hasNext: boolean;
  hasPrev: boolean;
};

export interface ProductFilters {
  categoryId?: number | number[];
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  material?: string;
  inStock?: boolean;
  isActive?: boolean;
  sort?: string;
  skip?: number;
  position?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:44360/api/Products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductsResponse>(this.apiUrl).pipe(
      map(r => r?.items ?? [])
    );
  }

  // הפונקציה המרכזית - מטפלת בכל הפילטרים כולל מערך קטגוריות
  // getProducts(filters?: ProductFilters): Observable<ProductsResponse> {
  //   let params = new HttpParams();

  //   if (filters) {
  //     // טיפול במערך קטגוריות
  //     if (filters.categoryId != null) {
  //       if (Array.isArray(filters.categoryId)) {
  //         filters.categoryId.forEach(id => {
  //           params = params.append('categoryId', id.toString());
  //         });
  //       } else {
  //         params = params.append('categoryId', filters.categoryId.toString());
  //       }
  //     }

  //     // טיפול בשאר הפרמטרים
  //     if (filters.q) params = params.set('q', filters.q);
  //     if (filters.minPrice != null) params = params.set('minPrice', filters.minPrice.toString());
  //     if (filters.maxPrice != null) params = params.set('maxPrice', filters.maxPrice.toString());
  //     if (filters.color) params = params.set('color', filters.color);
  //     if (filters.material) params = params.set('material', filters.material);
  //     if (filters.inStock != null) params = params.set('inStock', filters.inStock.toString());
  //     if (filters.isActive != null) params = params.set('isActive', filters.isActive.toString());
  //     if (filters.sort) params = params.set('sort', filters.sort);
  //     if (filters.skip != null) params = params.set('skip', filters.skip.toString());
  //     if (filters.position != null) params = params.set('position', filters.position.toString());
  //   }

  //   // כאן אנחנו מחזירים את כל האובייקט (כולל totalCount) ולא רק את ה-items
  //   return this.http.get<ProductsResponse>(this.apiUrl, { params });
  // }

  getProducts(filters?: ProductFilters): Observable<ProductsResponse> {
    let params = new HttpParams();

    if (filters) {
      // טיפול במערך קטגוריות
      if (filters.categoryId != null) {
        if (Array.isArray(filters.categoryId)) {
          filters.categoryId.forEach(id => {
            params = params.append('categoryId', id.toString());
          });
        } else {
          params = params.append('categoryId', filters.categoryId.toString());
        }
      }

      // טיפול בשאר הפרמטרים
      if (filters.q) params = params.set('q', filters.q);
      if (filters.minPrice != null) params = params.set('minPrice', filters.minPrice.toString());
      if (filters.maxPrice != null) params = params.set('maxPrice', filters.maxPrice.toString());
      if (filters.color) params = params.set('color', filters.color);
      if (filters.material) params = params.set('material', filters.material);
      if (filters.inStock != null) params = params.set('inStock', filters.inStock.toString());
      if (filters.isActive != null) params = params.set('isActive', filters.isActive.toString());
      if (filters.sort) params = params.set('sort', filters.sort);
      if (filters.skip != null) params = params.set('skip', filters.skip.toString());
      if (filters.position != null) params = params.set('position', filters.position.toString());
    }

    console.log('🌐 שולח בקשה לשרת עם הפרמטרים:', params.toString());

    // שימוש ב-pipe כדי לתפוס את התשובה או השגיאה מיד כשהן מגיעות
    return this.http.get<ProductsResponse>(this.apiUrl, { params }).pipe(
      tap((response: ProductsResponse) => {
        // tap לא משנה את הנתונים, רק מאפשר לנו "להציץ" בהם
        console.log('✅ הנתונים התקבלו בהצלחה בתוך ה-Service:', response);
      }),
      catchError((error) => {
        // catchError תופס שגיאות רשת או שגיאות בשרת
        console.error('❌ שגיאה נתפסה בתוך ה-Service:', error);
        // זורק את השגיאה הלאה לקומפוננטה כדי שגם היא תדע שנכשל
        return throwError(() => error); 
      })
    );
  }

  getById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }
}