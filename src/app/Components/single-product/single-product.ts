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
// }import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router'; 
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../Services/product-service';
import { ProductModel } from '../../Models/Products-Model';
// הוספתי כאן את המילה inject כדי שנוכל להשתמש בסרוויס של הסל
import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core'; 
import { CATEGORY_DICTIONARY } from '../../Models/categories.const';
import { CartService } from '../../Services/cart-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './single-product.html',
  styleUrl: './single-product.scss',
})
export class SingleProduct implements OnInit {
  
  // הנה החוט שחיברנו! הזרקת הסרוויס של הסל
  private cartService = inject(CartService); 

  product: ProductModel | null = null;
  loading = true;
  errorMsg = '';
  selectedImage: 'imgUrl' | 'imgUrl2' = 'imgUrl';
  qty = 1;
  breadcrumbLabel: string = 'כל המוצרים';
  isAdded: boolean = false; // המשתנה החדש שלנו לאנימציית הכפתור

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private productService: ProductService,
    private cdr: ChangeDetectorRef 
  ) {
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
    
    // כאן הקסם קורה! קוראים לסרוויס עם המוצר והכמות (qty) שהלקוחה בחרה
    this.cartService.addToCart(this.product, this.qty); 
    console.log('ADD TO CART', { product: this.product, qty: this.qty });

    
    this.isAdded = true;
    // אחרי 2000 מילי-שניות (2 שניות בדיוק), מחזירים את הכפתור למצב רגיל
    setTimeout(() => {
      this.isAdded = false;
      this.cdr.detectChanges(); 

    }, 800);
    
  }

    
    
  
}



