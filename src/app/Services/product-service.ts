import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap, catchError, throwError } from 'rxjs';
import { ProductModel } from '../Models/Products-Model';

// הגדרת המבנה שחוזר מה-API (חשוב מאוד בשביל ה-totalCount)
export type ProductsResponse = {
  items: ProductModel[];
  totalCount: number;
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

  // מביא את כל המוצרים ללא סינון
  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductsResponse>(this.apiUrl).pipe(
      map(res => res?.items ?? [])
    );
  }

  // הפונקציה המרכזית - תומכת בסינונים, חיפוש וגלילה אינסופית
  getProducts(filters?: ProductFilters): Observable<ProductsResponse> {
    let params = new HttpParams();

    if (filters) {
      // טיפול בקטגוריות (תומך גם בבודד וגם במערך)
      if (filters.categoryId != null) {
        if (Array.isArray(filters.categoryId)) {
          filters.categoryId.forEach(id => {
            params = params.append('categoryId', id.toString());
          });
        } else {
          params = params.append('categoryId', filters.categoryId.toString());
        }
      }

      // שאר הפרמטרים
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

    return this.http.get<ProductsResponse>(this.apiUrl, { params }).pipe(
      tap(res => console.log('✅ נתונים התקבלו:', res)),
      catchError(err => {
        console.error('❌ שגיאת Service:', err);
        return throwError(() => err);
      })
    );
  }

  // מביא מוצר בודד לפי ID - קריטי לדף Single Product!
  getById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }

  // מחיקה רכה - משנה את הסטטוס של המוצר ל-IsActive = false בשרת
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`✅ מוצר ${id} הועבר למצב לא פעיל`)),
      catchError(err => {
        console.error('❌ שגיאה במחיקת מוצר:', err);
        return throwError(() => err);
      })
    );
  }
}
//מנהל - זהבי 
//   private apiUrl ='https://localhost:44382/api/Products'
//   constructor(private http:HttpClient){}  


// getAllProducts(page: number = 1, pageSize: number = 12): Observable<any> {
//   return this.http.get<any>(`${this.apiUrl}?position=${page}&skip=${pageSize}`);
// }

//   getProductById(id: number): Observable<ProductModel> {
//     return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
//   }

//   addProduct(product: ProductModel): Observable<ProductModel> {
//     return this.http.post<ProductModel>(this.apiUrl, product);
//   }

//   updateProduct(id: number, product: ProductModel): Observable<ProductModel> {
//     return this.http.put<ProductModel>(`${this.apiUrl}/${id}`, product);
//   }

//   deleteProduct(id: number): Observable<boolean> {
//     return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
//   }
//   uploadImage(file: File) {
//   const formData = new FormData();
//   formData.append('file', file);
//   return this.http.post<any>(`${this.apiUrl}/upload-image`, formData);
// }
// }
