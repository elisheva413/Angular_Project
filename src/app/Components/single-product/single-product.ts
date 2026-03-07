// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { ButtonModule } from 'primeng/button';
// import { ProductService } from '../../Services/product-service';
// import { ProductModel } from '../../Models/Products-Model';
// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { CATEGORY_DICTIONARY } from '../../Models/categories.const';


// @Component({
//   selector: 'app-single-product',
//   standalone: true,
//   imports: [CommonModule, ButtonModule, RouterLink],
//   templateUrl: './single-product.html',
//   styleUrl: './single-product.scss',
// })
// export class SingleProduct implements OnInit {
//   product: ProductModel | null = null;

//   loading = true;
//   errorMsg = '';

//   selectedImage: 'imgUrl' | 'imgUrl2' = 'imgUrl';
//   qty = 1;

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService,
//     private cdr: ChangeDetectorRef // <--- הוספנו את זה כאן!
//   ) {}

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
    
//     console.log('--- התחלת טעינת דף מוצר ---');
//     console.log('1. ה-ID שזוהה מהכתובת:', id);

//     if (!id) {
//       this.loading = false;
//       this.errorMsg = 'מזהה מוצר לא תקין';
//       return;
//     }

//     this.loading = true;
//     console.log('2. שולח בקשה ל-Service...');
    
//   this.productService.getById(id).subscribe({
//       next: (p) => {
//         console.log('3. וינגו! התקבלה תשובה מהשרת:', p);
//         this.product = p;
//         this.selectedImage = 'imgUrl';
//         this.loading = false; 

//         // הנה מכת המחץ: אנחנו אומרים לאנגולר "תצייר את המסך מחדש עכשיו!"
//         this.cdr.detectChanges(); 
//       },
//       error: (err) => {
//         console.error('שגיאה:', err);
//         this.loading = false;
//         this.errorMsg = 'לא הצלחנו לטעון את המוצר';
//         this.cdr.detectChanges(); // גם כאן למקרה של שגיאה
//       },
//     });
//   }

//   get mainImageSrc(): string {
//     if (!this.product) return '';
//     const url =
//       this.selectedImage === 'imgUrl2' && this.product.imgUrl2
//         ? this.product.imgUrl2
//         : this.product.imgUrl;

//     if (!url) return '';
//     return url.startsWith('/') ? url : `/${url}`;
//   }

//   get thumb1(): string {
//     if (!this.product?.imgUrl) return '';
//     return this.product.imgUrl.startsWith('/') ? this.product.imgUrl : `/${this.product.imgUrl}`;
//   }

//   get thumb2(): string {
//     if (!this.product?.imgUrl2) return '';
//     return this.product.imgUrl2.startsWith('/') ? this.product.imgUrl2 : `/${this.product.imgUrl2}`;
//   }

//   selectImg(which: 'imgUrl' | 'imgUrl2') {
//     this.selectedImage = which;
//   }

//   dec() {
//     if (this.qty > 1) this.qty--;
//   }

//   inc() {
//     this.qty++;
//   }

//   addToCart() {
//     if (!this.product) return;
//     console.log('ADD TO CART', { product: this.product, qty: this.qty });
//   }
// }
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router'; // הוספנו Router
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../Services/product-service';
import { ProductModel } from '../../Models/Products-Model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CATEGORY_DICTIONARY } from '../../Models/categories.const';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './single-product.html',
  styleUrl: './single-product.scss',
})
export class SingleProduct implements OnInit {
  product: ProductModel | null = null;
  loading = true;
  errorMsg = '';
  selectedImage: 'imgUrl' | 'imgUrl2' = 'imgUrl';
  qty = 1;

  // משתנים לניהול הניווט החכם
  breadcrumbLabel: string = 'כל המוצרים';

  constructor(
    private route: ActivatedRoute,
    private router: Router, // הזרקת ה-Router לקריאת ה-State
    private productService: ProductService,
    private cdr: ChangeDetectorRef 
  ) {
    // בדיקה אם עבר מידע ב-State מהניווט הקודם (למשל שם הקטגוריה)
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['fromLabel']) {
      this.breadcrumbLabel = navigation.extras.state['fromLabel'];
    }
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!id) {
      this.loading = false;
      this.errorMsg = 'מזהה מוצר לא תקין';
      return;
    }

    this.loading = true;
    
    this.productService.getById(id).subscribe({
      next: (p) => {
        this.product = p;
        this.selectedImage = 'imgUrl';

        // תכנון חכם: אם הגענו ישירות לדף (Refresh), נשלוף את שם הקטגוריה מהמילון לפי ה-ID
        if (this.breadcrumbLabel === 'כל המוצרים' && p.categoryId) {
          const categoryEntry = CATEGORY_DICTIONARY[p.categoryId];
          if (categoryEntry) {
            this.breadcrumbLabel = categoryEntry.title;
          }
        }

        this.loading = false; 
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('שגיאה:', err);
        this.loading = false;
        this.errorMsg = 'לא הצלחנו לטעון את המוצר';
        this.cdr.detectChanges();
      },
    });
  }

  // לוגיקה קיימת של תמונות וכמות - נשמרת ללא שינוי
  get mainImageSrc(): string {
    if (!this.product) return '';
    const url = this.selectedImage === 'imgUrl2' && this.product.imgUrl2 ? this.product.imgUrl2 : this.product.imgUrl;
    return url ? (url.startsWith('/') ? url : `/${url}`) : '';
  }

  get thumb1(): string {
    if (!this.product?.imgUrl) return '';
    return this.product.imgUrl.startsWith('/') ? this.product.imgUrl : `/${this.product.imgUrl}`;
  }

  get thumb2(): string {
    if (!this.product?.imgUrl2) return '';
    return this.product.imgUrl2.startsWith('/') ? this.product.imgUrl2 : `/${this.product.imgUrl2}`;
  }

  selectImg(which: 'imgUrl' | 'imgUrl2') { this.selectedImage = which; }
  dec() { if (this.qty > 1) this.qty--; }
  inc() { this.qty++; }

  addToCart() {
    if (!this.product) return;
    console.log('ADD TO CART', { product: this.product, qty: this.qty });
  }
}