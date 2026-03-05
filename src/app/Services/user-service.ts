// import { Injectable } from '@angular/core';
// import { HttpClient} from '@angular/common/http';
// import { ProductModel } from '../Models/Products-Model';

// @Injectable({
//   providedIn: 'root',
// })
// export class ProductService {
//   private apiUrl ='https://localhost:44360/api/Users'
//   constructor(private http:HttpClient){}  
// getAllProducts(){
//   return this.http.get<ProductModel[]>(this.apiUrl)
// }


// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductModel } from '../Models/Products-Model';

type ProductsResponse = {
  items: ProductModel[];
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:44360/api/Products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductsResponse>(this.apiUrl).pipe(
      map(res => res.items ?? [])
    );
  }

  getProducts(filters?: {
    categoryId?: number;
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
  }): Observable<ProductModel[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.categoryId != null) params = params.set('categoryId', filters.categoryId);
      if (filters.q) params = params.set('q', filters.q);

      if (filters.minPrice != null) params = params.set('minPrice', filters.minPrice);
      if (filters.maxPrice != null) params = params.set('maxPrice', filters.maxPrice);

      if (filters.color) params = params.set('color', filters.color);
      if (filters.material) params = params.set('material', filters.material);

      if (filters.inStock != null) params = params.set('inStock', filters.inStock);
      if (filters.isActive != null) params = params.set('isActive', filters.isActive);

      if (filters.sort) params = params.set('sort', filters.sort);

      if (filters.skip != null) params = params.set('skip', filters.skip);
      if (filters.position != null) params = params.set('position', filters.position);
    }

    return this.http.get<ProductsResponse>(this.apiUrl, { params }).pipe(
      map(res => res.items ?? [])
    );
  }
}