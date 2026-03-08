import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { ProductService } from '../../../Services/product-service';
import { ProductModel } from '../../../Models/Products-Model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService, ConfirmationService } from 'primeng/api'; 
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, TableModule, ButtonModule,
    DialogModule, InputTextModule, InputNumberModule, FloatLabelModule,
    ToastModule, ConfirmDialogModule, TagModule, CheckboxModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './product-management.html',
  styleUrls: ['./product-management.scss']
})
export class ProductManagementComponent implements OnInit {
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  products: ProductModel[] = [];
  displayDialog = false;
  isEditMode = false;
  productForm: ProductModel = this.getEmptyProduct();
  selectedFile1: File | null = null;
  selectedFile2: File | null = null;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts(1, 100).subscribe({
      next: (data: any) => {
        if (data) {
          const items = data.products?.$values || data.products || data.items || data;
          this.products = Array.isArray(items) ? items : [];
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'לא הצלחתי לשלוף נתונים' });
      }
    });
  }

getProductImagePath(product: any, field: 'imgUrl' | 'imgUrl2' = 'imgUrl'): string {
  const pathFromDb = product[field];
  
  if (!pathFromDb) {
    return 'assets/images/no-image.png';
  }

  // ניקוי סלאשים הפוכים אם יש
  const cleanPath = pathFromDb.replace(/\\/g, '/');

  // מכיוון שהתמונות בתוך public/products, וה-DB מכיל "Bracelets/..."
  // הנתיב הסופי בדפדפן צריך להיות /products/Bracelets/...
  return `/products/${cleanPath}`;
}

  openAddDialog() {
    this.isEditMode = false;
    this.productForm = this.getEmptyProduct();
    this.displayDialog = true;
  }

  openEditDialog(product: ProductModel) {
    this.isEditMode = true;
    this.productForm = { ...product };
    this.displayDialog = true;
  }

  saveProduct() {
    if (!this.productForm.productName?.trim()) return;

    const upload1$ = this.selectedFile1 ? this.productService.uploadImage(this.selectedFile1) : of(null);
    const upload2$ = this.selectedFile2 ? this.productService.uploadImage(this.selectedFile2) : of(null);

    forkJoin([upload1$, upload2$]).subscribe({
      next: ([res1, res2]) => {
        if (res1) this.productForm.imgUrl = res1.imageUrl;
        if (res2) this.productForm.imgUrl2 = res2.imageUrl;
        this.saveProductToServer();
        this.selectedFile1 = null;
        this.selectedFile2 = null;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'העלאת התמונות נכשלה' });
      }
    });
  }

  private saveProductToServer() {
    if (this.isEditMode) {
      this.productService.updateProduct(this.productForm.productId, this.productForm).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'המוצר עודכן' });
        this.loadProducts();
        this.displayDialog = false;
      });
    } else {
      this.productService.addProduct(this.productForm).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'המוצר נוסף' });
        this.loadProducts();
        this.displayDialog = false;
      });
    }
  }

  deleteProduct(id: number) {
    this.confirmationService.confirm({
      message: 'האם את בטוחה שברצונך למחוק מוצר זה?',
      header: 'אישור מחיקה',
      accept: () => {
        this.productService.deleteProduct(id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'המוצר נמחק' });
          this.loadProducts();
        });
      }
    });
  }

  getEmptyProduct(): ProductModel {
    return {
      productId: 0, productName: '', description: '', price: 0,
      categoryId: 1, quantity: 0, isActive: true, imgUrl: '', imgUrl2: '',
      color: '', material: ''
    };
  }

  onFileSelected1(event: any) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) this.selectedFile1 = file;
  }

  onFileSelected2(event: any) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) this.selectedFile2 = file;
  }
}