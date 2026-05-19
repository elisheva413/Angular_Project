
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../Services/product-service';
import { CategoryService } from '../../../Services/category-service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-management.html',
  styleUrls: ['./product-management.scss']
})
export class ProductManagementComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  products: any[] = [];
  categories: any[] = [];

  colorOptions = [
    'אדום', 'ורוד', 'טורקיז', 'כחול', 'סגול', 'שחור', 'לבן', 'כסף', 'זהב', 'רוז'
  ];

  materialOptions = [
    'כסף בציפוי זהב 18K', 'כסף סטרלינג', 'אבן פנדורה בשילוב זהב 14K',
    'כסף בשילוב רוז גולד 14K', 'ציפוי זהב 14k', 'ציפוי רוז גולד 14K', 'ציפוי רותניום'
  ];

  selectedColors: string[] = [];
  selectedMaterials: string[] = [];
  displayDialog: boolean = false;
  isEditMode: boolean = false;
  uploading: boolean = false;

  Math = Math;
  totalCount: number = 0;
  pageSize: number = 12;
  currentPage: number = 0;
  toastMessage: string | null = null;

  searchQuery: string = '';
  isSearchMode: boolean = false;
  highlightedId: number | null = null;

  productForm: any = {
    productsId: 0, categoryId: null, productsName: '', productsDescreption: '',
    price: null, imgUrl: '', imgUrl2: '', color: '', material: '', quantity: 0, isActive: true
  };

  ngOnInit() {
    this.currentPage = 0;
    this.loadProducts();
    this.loadCategories();
  }

  showSuccessToast(message: string) {
    this.toastMessage = message;
    setTimeout(() => this.toastMessage = null, 3000);
  }

 getImageUrl(imgPath: string, productName: string = ''): string {
    // 1. טיפול בגיפט קארד
    if ((imgPath && imgPath.includes('dummy_')) || (productName && productName.toLowerCase().includes('gift card'))) {
        return '/images/GIFT-CARD.png';
    }

    // 2. תמונת ברירת מחדל אם אין שום נתיב
    if (!imgPath || imgPath.trim() === '') {
        return '/images/no-image.png';
    }

    let cleanPath = imgPath.replace(/\\/g, '/');

    // אם השרת החזיר כתובת אינטרנט מלאה (למשל אם עברתם לאחסון ענן בעתיד)
    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
        return cleanPath;
    }

    // 3. הסרת לוכסן התחלתי אם קיים, כדי למנוע בלבול בניתוב
    if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1); 
    }

    // 4. תיקון נתיבים של קבצים שיושבים פיזית באנגולר (תיקיית assets/images)
    if (cleanPath.startsWith('images/') || cleanPath.startsWith('assets/')) {
        return '/' + cleanPath;
    }

    // 5. תמונות שמגיעות משרת ה-C#
    const apiBaseUrl = 'https://localhost:44360/';
    
    if (cleanPath.startsWith('products/')) {
      return `${apiBaseUrl}${cleanPath}`;
    } else {
      return `${apiBaseUrl}products/${cleanPath}`;
    }
  }

  loadProducts() {
    const filters = { skip: this.pageSize, position: this.currentPage + 1 };
    this.productService.getProducts(filters).subscribe({
      next: (res: any) => {
        this.products = res.items || [];
        this.totalCount = res.totalCount || this.products.length;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('❌ שגיאה בשליפת מוצרים:', err)
    });
  }

  categoryAliases: Record<string, string[]> = {
    'Necklaces':  ['שרשרת', 'שרשראות', 'necklace', 'necklaces'],
    'Bracelets':  ['צמיד', 'צמידים', 'bracelet', 'bracelets'],
    'Earrings':   ['עגיל', 'עגילים', 'earring', 'earrings'],
    'Rings':      ['טבעת', 'טבעות', 'ring', 'rings'],
    'Charms':     ['תיליון', 'תיליונים', 'charm', 'charms'],
  };

  searchProduct() {
    const q = this.searchQuery.trim();
    if (!q) return;

    const asId = Number(q);
    if (!isNaN(asId) && asId > 0) {
      this.productService.getById(asId).subscribe({
        next: (product: any) => {
          this.products = product ? [product] : [];
          this.totalCount = this.products.length;
          this.highlightedId = asId;
          this.isSearchMode = true;
          this.cdr.detectChanges();
        },
        error: () => {
          this.products = [];
          this.totalCount = 0;
          this.isSearchMode = true;
          this.cdr.detectChanges();
        }
      });
    } else {
      const lower = q.toLowerCase();

      // בדיקה אם הקלט תואם קטגוריה (עברית או אנגלית)
      const matchedCategoryName = Object.keys(this.categoryAliases).find(catName =>
        catName.toLowerCase() === lower ||
        this.categoryAliases[catName].some(alias => alias === lower)
      );
      const matchedCategory = matchedCategoryName
        ? this.categories.find((c: any) => c.categoryName?.toLowerCase() === matchedCategoryName.toLowerCase())
        : null;

      if (matchedCategory) {
        // חיפוש לפי קטגוריה דרך השרת
        this.productService.getProducts({ categoryId: matchedCategory.categoryId, skip: 9999, position: 1 }).subscribe({
          next: (res: any) => {
            this.products = res.items || [];
            this.totalCount = this.products.length;
            this.highlightedId = null;
            this.isSearchMode = true;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('שגיאת חיפוש:', err)
        });
      } else {
        // חיפוש לפי שם מוצר - client-side רק לפי productsName
        this.productService.getProducts({ skip: 9999, position: 1 }).subscribe({
          next: (res: any) => {
            const all: any[] = res.items || [];
            this.products = all.filter(p =>
              p.productsName?.toLowerCase().includes(lower)
            );
            this.totalCount = this.products.length;
            this.highlightedId = null;
            this.isSearchMode = true;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('שגיאת חיפוש:', err)
        });
      }
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.isSearchMode = false;
    this.highlightedId = null;
    this.currentPage = 0;
    this.loadProducts();
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalCount) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  goToFirst() { this.currentPage = 0; this.loadProducts(); }
  goToLast() { this.currentPage = Math.floor((this.totalCount - 1) / this.pageSize); this.loadProducts(); }
  get totalPages() { return Math.ceil(this.totalCount / this.pageSize) || 1; }

  loadCategories() {
    this.categoryService.getCategories().subscribe(res => this.categories = res);
  }

  dragOver: number | null = null;

  onDragEnter(event: DragEvent, index: number) {
    event.preventDefault();
    this.dragOver = index;
  }

  onDragLeave(event: DragEvent, index: number) {
    const target = event.currentTarget as HTMLElement;
    const related = event.relatedTarget as Node;
    if (!target.contains(related)) this.dragOver = null;
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    this.dragOver = null;
    const file = event.dataTransfer?.files[0];
    if (!file) return;
    this.uploadFile(file, index);
  }

  onFileUpload(event: any, imageIndex: number) {
    const file = event.target.files[0];
    if (!file) return;
    this.uploadFile(file, imageIndex);
  }

  private uploadFile(file: File, imageIndex: number) {
    this.uploading = true;
    this.productService.uploadImage(file).subscribe({
      next: (res: any) => {
        if (imageIndex === 1) this.productForm.imgUrl = res.imageUrl;
        else this.productForm.imgUrl2 = res.imageUrl;
        this.uploading = false;
        this.showSuccessToast('התמונה הועלתה בהצלחה');
      },
      error: () => { this.uploading = false; alert('העלאת תמונה נכשלה'); }
    });
  }

  openAdd() {
    this.isEditMode = false;
    this.resetForm();
    this.displayDialog = true;
  }

  onColorSelect(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    if (!val || this.selectedColors.includes(val)) return;
    this.selectedColors.push(val);
    this.productForm.color = this.selectedColors.join(', ');
    (event.target as HTMLSelectElement).value = '';
  }

  removeColor(val: string) {
    this.selectedColors = this.selectedColors.filter(c => c !== val);
    this.productForm.color = this.selectedColors.join(', ');
  }

  addCustomMaterial(event: Event) {
    const input = event.target as HTMLInputElement;
    const val = input.value.trim();
    if (!val) return;
    if (!this.selectedMaterials.includes(val)) {
      this.selectedMaterials.push(val);
      this.productForm.material = this.selectedMaterials.join(', ');
    }
    input.value = '';
  }

  openEdit(product: any) {
    this.isEditMode = true;
    this.selectedColors = product.color ? product.color.split(',').map((s: string) => s.trim()) : [];
    this.selectedMaterials = product.material ? product.material.split(',').map((s: string) => s.trim()) : [];
    this.productForm = {
      productsId: product.productsId || product.productId || product.id,
      categoryId: product.categoryId,
      productsName: product.productsName,
      price: product.price,
      imgUrl: product.imgUrl || '',
      imgUrl2: product.imgUrl2 || '',
      color: product.color || '',
      material: product.material || '',
      productsDescreption: product.productsDescreption || '',
      quantity: product.quantity || 0,
      isActive: product.isActive !== false
    };
    this.displayDialog = true;
  }

  saveProduct() {
    if (this.productForm.isActive && this.productForm.quantity <= 0) {
      alert('לא ניתן להפוך מוצר לפעיל אם המלאי שלו הוא 0. אנא עדכני כמות במלאי.');
      return;
    }
    if (!this.productForm.productsName || !this.productForm.price || !this.productForm.categoryId) {
      alert('נא למלא את כל שדות החובה (*)');
      return;
    }
    const payload = { ...this.productForm };
    const productId = payload.productsId;
    delete payload.category;
    delete payload.ordersItems;

    const action = this.isEditMode ?
      this.productService.updateProduct(productId, payload) :
      this.productService.addProduct(payload);

    action.subscribe({
      next: () => {
        this.showSuccessToast(`המוצר נשמר בהצלחה!`);
        this.closeDialog();
        this.loadProducts();
      },
      error: (err) => {
        console.error('שגיאת שרת בשמירה:', err);
        alert('שגיאה בשמירת המוצר! ייתכן ששם המוצר כבר קיים במערכת.');
      }
    });
  }

  deleteProduct(product: any) {
    if (confirm('האם את בטוחה שברצונך להפוך מוצר זה ללא פעיל?\n(הוא יוסתר מהחנות אך יישמר במערכת)')) {
      const id = product.productsId || product.productId || product.id;
      const payload: any = { ...product, isActive: false };
      delete payload.category;
      delete payload.ordersItems;

      this.productService.updateProduct(id, payload).subscribe({
          next: () => {
              this.showSuccessToast('המוצר הועבר לסטטוס "לא פעיל" בהצלחה');
              this.loadProducts();
          },
          error: (err) => {
              console.error('שגיאה בשינוי סטטוס:', err);
              alert('אירעה שגיאה מול השרת בשינוי הסטטוס.');
          }
      });
    }
  }

  onMaskClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('p-dialog-mask')) {
      this.closeDialog();
    }
  }

  closeDialog() { this.displayDialog = false; }

  resetForm() {
    this.selectedColors = [];
    this.selectedMaterials = [];
    this.productForm = {
      productsId: 0, categoryId: null, productsName: '', price: null,
      quantity: 0, isActive: true, imgUrl: '', imgUrl2: '', color: '', material: ''
    };
  }
}
