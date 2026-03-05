// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService, ProductsResponse } from '../../Services/product-service';
// import { ProductModel } from '../../Models/Products-Model';
// import { ProductCard } from '../product-card/product-card';
// import { ProductFilter } from '../product-filter/product-filter';

// @Component({
//   selector: 'app-products-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ProductCard, ProductFilter],
//   templateUrl: './products-list.html',
//   styleUrl: './products-list.scss',
// })
// export class ProductsList implements OnInit {
//   products: ProductModel[] = [];
//   isLoading = false;
//   errorMsg = '';
  
//   // לוגיקות נוספות שייתכן ונצטרך
//   totalCount = 0;

//   constructor(
//     private productservice: ProductService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     // חשוב! מאזין לשינויים ב-URL (כשלוחצים על קטגוריה ב-Menu)
//     this.route.queryParams.subscribe(params => {
//       this.loadProducts(params);
//     });
//   }

//   loadProducts(filters: any = {}): void {
//     this.isLoading = true;
//     this.errorMsg = '';
    

//     this.productservice.getProducts(filters).subscribe({
      
//       next: (res: ProductsResponse) => {
//         // כאן התיקון הקריטי: מחלצים את המערך מתוך האובייקט שהשרת מחזיר
//             console.log("122222");

//          console.log('הנתונים שהגיעו מהשרת:', res); // זה ידפיס לנו הכל לקונסול!
//         this.products = res.items ?? [];
//         this.totalCount = res.totalCount;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('טעינת מוצרים נכשלה', err);
//         this.errorMsg = 'לא הצלחנו לטעון מוצרים';
//         this.isLoading = false;
//       },
//     });


//   }

//   // שומר על הפונקציות המקוריות שלך
//   onAddToCart(p: ProductModel) {
//     console.log('Add to cart:', p);
//   }

//   trackById(_index: number, item: ProductModel) {
//     return item.productsId;
//   }
// }

// 1. הוספנו את ChangeDetectorRef לכאן
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService, ProductsResponse } from '../../Services/product-service';
import { ProductModel } from '../../Models/Products-Model';
import { ProductCard } from '../product-card/product-card';
import { ProductFilter } from '../product-filter/product-filter';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCard, ProductFilter],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList implements OnInit {
  products: ProductModel[] = [];
  isLoading = false;
  errorMsg = '';
  totalCount = 0;

  constructor(
    private productservice: ProductService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // 2. הזרקנו את הכלי שמעדכן את המסך
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loadProducts(params);
    });
  }

  loadProducts(filters: any = {}): void {
    this.isLoading = true;
    this.errorMsg = '';
    
    this.productservice.getProducts(filters).subscribe({
      next: (res: ProductsResponse) => {
        console.log('הנתונים שהגיעו מהשרת:', res);
        
        this.products = res.items ?? [];
        this.totalCount = res.totalCount;
        this.isLoading = false; // עדכנו שהטעינה הסתיימה
        
        // 3. הפקודה שמעירה את אנגולר ומכריחה אותו לרנדר את המסך מחדש
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('טעינת מוצרים נכשלה', err);
        this.errorMsg = 'לא הצלחנו לטעון מוצרים';
        this.isLoading = false;
        
        // חשוב לעדכן את המסך גם במקרה של שגיאה
        this.cdr.detectChanges(); 
      },
    });
  }

  onAddToCart(p: ProductModel) {
    console.log('Add to cart:', p);
  }

  trackById(_index: number, item: ProductModel) {
    return item.productsId;
  }
}