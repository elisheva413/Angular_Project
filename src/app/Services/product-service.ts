import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ProductModel } from '../Models/Products-Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl ='https://localhost:44382/api/Products'
  constructor(private http:HttpClient){}  


getAllProducts(page: number = 1, pageSize: number = 12): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}?position=${page}&skip=${pageSize}`);
}

  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.apiUrl, product);
  }

  updateProduct(id: number, product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
  uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<any>(`${this.apiUrl}/upload-image`, formData);
}
}


