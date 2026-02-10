import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ProductModel } from '../Models/Prodects-Model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl ='https://localhost:44360/api/Products'
  constructor(private http:HttpClient){}  
getAllProducts(){
  return this.http.get<ProductModel[]>(this.apiUrl)
}


}


