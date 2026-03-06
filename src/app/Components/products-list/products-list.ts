

// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { ProductService, ProductsResponse } from '../../Services/product-service';
// import { ProductModel } from '../../Models/Products-Model';
// import { ProductCard } from '../product-card/product-card';
// import { ProductFilter } from '../product-filter/product-filter';

// @Component({
//   selector: 'app-products-list',
//   standalone: true,
//   // הורדנו מכאן את ה-Sidebar של פריים שהפריע
//   imports: [CommonModule, FormsModule, RouterModule, ProductCard, ProductFilter], 
//   templateUrl: './products-list.html',
//   styleUrl: './products-list.scss',
// })
// export class ProductsList implements OnInit {
//   products: ProductModel[] = [];
//   isLoading = false;
//   errorMsg = '';
//   totalCount = 0;

//   // --- משתנה לשליטה על תפריט הסינון האישי שלנו ---
//   isFilterSidebarOpen = false;

//   // --- משתנים עבור הכותרות והתיאורים ---
//   currentTitle = '';
//   currentDesc = '';
//   searchQuery = ''; 
//   isExpanded = false; 
//   descMaxLength = 130; 

//   categoryDictionary: Record<number, { title: string, desc: string }> = {
//     100: { 
//       title: 'טבעות', 
//       desc: 'מגוון ענק של טבעות מושלמות לנשים מחכות שתגידי להן I DO! אז מה הסגנון שלך? מראה שכבות נוטף סטייל שאי אפשר להתעלם ממנו או טבעת מכסף אלגנטית אחת שתתאים לכל לוק? יש לנו את הכל מהכל עבור טבעות כסף לאישה! החל מטבעת גל עם זרקונים מנצנצים שייתנו לאאוטפיט שלך טאץ\' של גלואו ועד לטבעת כסף עם אבן קריסטל צבעונית שתמשוך את כל המבטים. כסף סטרלינג 925, ציפוי זהב או רוז נחושת? אנחנו הכי בעד שתלכי על מיקס אנד מאץ\'. עכשיו נותר לך רק לבחור…'
//     },
//     105: { 
//       title: 'צמידים', 
//       desc: 'איפה קונים צמיד מושלם? יש לך ספק בכלל? ברור שבפנדורה! בואי לבחור את האחד שלך מבין כל האפשרויות של צמידים לאישה.בחרי צמיד כסף בנגל קשיח עם סוגרים בעיצובים שונים, צמידי כסף קלאסיים עם צ\'ארמס ותליונים,  החל מצמיד לינקים מגה-טרנדי מקולקציית Pandora me החדשה לנשים ועד לצמידי מומנטס אייקונים שתמיד כיף לשדרג עם צ\'ארמס חדשים, צמידי טניס משובצים בזרקונים מנצנצים או צמידי בנגל קשיחים ללוק על-זמני מנצח. זה המומנט להשיג את הפיס המושלם שיבטא את הסטייל האישי שלך ויקטוף את כל המחמאות. תיבת התכשיטים שלך מוסרת לך תודה 😊'
//     },
//     110: { 
//       title: 'צ\'ארמס', 
//       desc: 'הדבר שאנחנו הכי אוהבות לעשות? לחדש את צמיד המומנטס שלנו כמובן! בואי להוסיף צ\'ארמס חדשים שיספרו את הסיפור שלך ויכניסו ערימות של סטייל. צ\'ארמס משובצים בזרקונים מנצנצים, עם זכוכיות מוראנו, בציפוי רוז גולד או ציפוי זהב, קולקציות בלעדיות של דיסני, פרחים או בכלל חיות. יש לנו את הכל מהכל, רק תבחרי.'
//     },
//     115: { 
//       title: 'שרשראות', 
//       desc: 'כבר הוספת לתיבת התכשיטים שלך שרשרת כסף לינקים סופר-טרנדית מקולקציית Pandora me? ומה עם שרשרת מכסף מעודנת ועל-זמנית עם תליון לב בשילוב אבן קריסטל שתנצנץ למרחקים? תהיי בטוחה שיש לנו את סוגים שונים של שרשראות עם או בלי תליונים לבחירה. כל מה שאת צריכה כדי לקחת את הלוק שלך לגבהים חדשים של סטייל. רוצה המלצת סטיילינג רותחת עבור שרשראות כסף? לכי על מראה שכבות עדכני עם שילובי מתכות – אין יותר שיק מכסף סטרלינג 925, רוז גולד וציפוי זהב ביחד. אפשר להגיד לך כבר מעכשיו תתחדשי?'
//     },
//     120: { 
//       title: 'עגילים', 
//       desc: 'עגילים – הם משלימים את הלוק, תמיד בולטים לעין ומבליטים את יופייך הטבעי. מחפשת זוג עגילים לאישה מנצנצים מכסף שיקפיצו לך את הלוק ברגע? זה המומנט להכניס לתיבת התכשיטים שלך פיסים על-זמניים שתשמחי לענוד בכל הזדמנות אפשרית. עגיל כסף 925 מנצנץ ומעודן שיתאים לכל אאוטפיט או עגילים מכסף עם אבן קריסטל צבעונית ומרשימה שתיקח את הסטייל שלך לשלב הבא. עגילי כסף צורת לב מרגשת, פרחים מתוקים שירעננו את הלוק, כוכבים מנצנצים או בכלל פרפרים צבעוניים – יש לנו את כל האפשרויות שבעולם לנשים. איך שלא תסתכלי על זה, עגילי נשים זה מאסט, יו וולקאם.'
//     },
//     130: { 
//       title: 'תכשיטי חריטה', 
//       desc: 'הפכו את המתנה שלכם לעוד יותר אישית עם תכשיטי חריטה ייחודיים לאישה. שלל צמידי חריטה, תליונים לחריטה לשרשראות ועוד. הוסיפו חריטה של ראשי תיבות, תאריכים מיוחדים או מסר מרגש ליקירים שלכם. בחרו את תכשיטים עם חריטה אישית לנשים בעיצוב אישי שהיא הכי תאהב ועצבו אותו בנוחות ובקלות בכמה צעדים פשוטים.'
//     }
//   };

//   constructor(
//     private productservice: ProductService,
//     private route: ActivatedRoute,
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.handleHeaderDisplay(params); 
//       this.loadProducts(params);
//     });
//   }

//   handleHeaderDisplay(params: any): void {
//     this.isExpanded = false; 

//     if (params['q']) {
//       this.searchQuery = params['q'];
//       this.currentTitle = '';
//       this.currentDesc = '';
//     } 
//     else if (params['categoryId']) {
//       this.searchQuery = '';
//       const id = Number(params['categoryId']);
      
//       if (this.categoryDictionary[id]) {
//         this.currentTitle = this.categoryDictionary[id].title;
//         this.currentDesc = this.categoryDictionary[id].desc;
//       } else {
//         this.currentTitle = 'מוצרים';
//         this.currentDesc = '';
//       }
//     } 
//     else {
//       this.searchQuery = '';
//       this.currentTitle = 'מוצרים';
//       this.currentDesc = '';
//     }
//   }

//   toggleDesc(): void {
//     this.isExpanded = !this.isExpanded;
//   }

//   loadProducts(filters: any = {}): void {
//     this.isLoading = true;
//     this.errorMsg = '';
    
//     this.productservice.getProducts(filters).subscribe({
//       next: (res: ProductsResponse) => {
//         console.log('הנתונים שהגיעו מהשרת:', res); 
//         this.products = res.items ?? [];
//         this.totalCount = res.totalCount;
//         this.isLoading = false;
        
//         this.cdr.detectChanges(); 
//       },
//       error: (err) => {
//         console.error('טעינת מוצרים נכשלה', err);
//         this.errorMsg = 'לא הצלחנו לטעון מוצרים';
//         this.isLoading = false;
        
//         this.cdr.detectChanges(); 
//       },
//     });
//   }

//   onAddToCart(p: ProductModel) {
//     console.log('Add to cart:', p);
//   }

//   trackById(_index: number, item: ProductModel) {
//     return item.productsId;
//   }
// }
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
// import { ProductService, ProductsResponse } from '../../Services/product-service';
// import { ProductModel } from '../../Models/Products-Model';
// import { ProductCard } from '../product-card/product-card';
// import { ProductFilter } from '../product-filter/product-filter';

// @Component({
//   selector: 'app-products-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule, ProductCard, ProductFilter], 
//   templateUrl: './products-list.html',
//   styleUrl: './products-list.scss',
// })
// export class ProductsList implements OnInit {
//   products: ProductModel[] = [];
//   isLoading = false;
//   errorMsg = '';
//   totalCount = 0;

//   isFilterSidebarOpen = false;

//   currentTitle = '';
//   currentDesc = '';
//   searchQuery = ''; 
//   isExpanded = false; 
//   descMaxLength = 130; 

//   // מערך שישמור אילו חומרים מסומנים כרגע
//   selectedMaterials: string[] = [];



//   categoryDictionary: Record<number, { title: string, desc: string }> = {
//     100: { title: 'טבעות', desc: 'מגוון ענק של טבעות מושלמות לנשים מחכות שתגידי להן I DO! אז מה הסגנון שלך? מראה שכבות נוטף סטייל שאי אפשר להתעלם ממנו או טבעת מכסף אלגנטית אחת שתתאים לכל לוק? יש לנו את הכל מהכל עבור טבעות כסף לאישה! החל מטבעת גל עם זרקונים מנצנצים שייתנו לאאוטפיט שלך טאץ\' של גלואו ועד לטבעת כסף עם אבן קריסטל צבעונית שתמשוך את כל המבטים. כסף סטרלינג 925, ציפוי זהב או רוז נחושת? אנחנו הכי בעד שתלכי על מיקס אנד מאץ\'. עכשיו נותר לך רק לבחור…' },
//     105: { title: 'צמידים', desc: 'איפה קונים צמיד מושלם? יש לך ספק בכלל? ברור שבפנדורה! בואי לבחור את האחד שלך מבין כל האפשרויות של צמידים לאישה.בחרי צמיד כסף בנגל קשיח עם סוגרים בעיצובים שונים, צמידי כסף קלאסיים עם צ\'ארמס ותליונים,  החל מצמיד לינקים מגה-טרנדי מקולקציית Pandora me החדשה לנשים ועד לצמידי מומנטס אייקונים שתמיד כיף לשדרג עם צ\'ארמס חדשים, צמידי טניס משובצים בזרקונים מנצנצים או צמידי בנגל קשיחים ללוק על-זמני מנצח. זה המומנט להשיג את הפיס המושלם שיבטא את הסטייל האישי שלך ויקטוף את כל המחמאות. תיבת התכשיטים שלך מוסרת לך תודה 😊' },
//     110: { title: 'צ\'ארמס', desc: 'הדבר שאנחנו הכי אוהבות לעשות? לחדש את צמיד המומנטס שלנו כמובן! בואי להוסיף צ\'ארמס חדשים שיספרו את הסיפור שלך ויכניסו ערימות של סטייל. צ\'ארמס משובצים בזרקונים מנצנצים, עם זכוכיות מוראנו, בציפוי רוז גולד או ציפוי זהב, קולקציות בלעדיות של דיסני, פרחים או בכלל חיות. יש לנו את הכל מהכל, רק תבחרי.' },
//     115: { title: 'שרשראות', desc: 'כבר הוספת לתיבת התכשיטים שלך שרשרת כסף לינקים סופר-טרנדית מקולקציית Pandora me? ומה עם שרשרת מכסף מעודנת ועל-זמנית עם תליון לב בשילוב אבן קריסטל שתנצנץ למרחקים? תהיי בטוחה שיש לנו את סוגים שונים של שרשראות עם או בלי תליונים לבחירה. כל מה שאת צריכה כדי לקחת את הלוק שלך לגבהים חדשים של סטייל. רוצה המלצת סטיילינג רותחת עבור שרשראות כסף? לכי על מראה שכבות עדכני עם שילובי מתכות – אין יותר שיק מכסף סטרלינג 925, רוז גולד וציפוי זהב ביחד. אפשר להגיד לך כבר מעכשיו תתחדשי?' },
//     120: { title: 'עגילים', desc: 'עגילים – הם משלימים את הלוק, תמיד בולטים לעין ומבליטים את יופייך הטבעי. מחפשת זוג עגילים לאישה מנצנצים מכסף שיקפיצו לך את הלוק ברגע? זה המומנט להכניס לתיבת התכשיטים שלך פיסים על-זמניים שתשמחי לענוד בכל הזדמנות אפשרית. עגיל כסף 925 מנצנץ ומעודן שיתאים לכל אאוטפיט או עגילים מכסף עם אבן קריסטל צבעונית ומרשימה שתיקח את הסטייל שלך לשלב הבא. עגילי כסף צורת לב מרגשת, פרחים מתוקים שירעננו את הלוק, כוכבים מנצנצים או בכלל פרפרים צבעוניים – יש לנו את כל האפשרויות שבעולם לנשים. איך שלא תסתכלי על זה, עגילי נשים זה מאסט, יו וולקאם.' },
//     130: { title: 'תכשיטי חריטה', desc: 'הפכו את המתנה שלכם לעוד יותר אישית עם תכשיטי חריטה ייחודיים לאישה. שלל צמידי חריטה, תליונים לחריטה לשרשראות ועוד. הוסיפו חריטה של ראשי תיבות, תאריכים מיוחדים או מסר מרגש ליקירים שלכם. בחרו את תכשיטים עם חריטה אישית לנשים בעיצוב אישי שהיא הכי תאהב ועצבו אותו בנוחות ובקלות בכמה צעדים פשוטים.' },
//     135: { title: 'NEW COLLECTION', desc: 'כל הפריטים החדשים שנחתו בפנדורה וחייבים ליהיות שלך - מחכים לך כאן!\n החל  מעגילי חישוק שישאירו חותם ועד לצ\'ארמס שישדרגו את צמיד המומנטס האהוב אפשר כבר להגיד לך תתחדשי?' }
//   };

//   constructor(
//     private productservice: ProductService,
//     private route: ActivatedRoute,
//     private router: Router, // הזרקנו לכאן את הראוטר
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.handleHeaderDisplay(params); 
      
//       // קורא מה-URL אילו חומרים מסומנים עכשיו (כדי שהצ'קבוקס יישאר מסומן אם מרעננים)
//       if (params['material']) {
//         this.selectedMaterials = params['material'].split(',');
//       } else {
//         this.selectedMaterials = [];
//       }

//       this.loadProducts(params);
//     });
//   }

//   // --- הפונקציה החדשה שמטפלת בלחיצה על הצ'קבוקסים של החומרים ---
//   toggleMaterial(materialValue: string, event: any): void {
//     if (event.target.checked) {
//       this.selectedMaterials.push(materialValue); // מוסיף למערך
//     } else {
//       this.selectedMaterials = this.selectedMaterials.filter(m => m !== materialValue); // מסיר מהמערך
//     }

//     // הופך את המערך למחרוזת (למשל: "silver,gold"). אם ריק, מחזיר null כדי למחוק מה-URL
//     const materialParam = this.selectedMaterials.length > 0 ? this.selectedMaterials.join(',') : null;

//     // מעדכן את ה-URL ומשאיר את שאר הפרמטרים (כמו categoryId) בזכות ה-merge
//     this.router.navigate([], {
//       relativeTo: this.route,
//       queryParams: { material: materialParam },
//       queryParamsHandling: 'merge' 
//     });
//   }

//   handleHeaderDisplay(params: any): void {
//     this.isExpanded = false; 

//     if (params['q']) {
//       this.searchQuery = params['q'];
//       this.currentTitle = '';
//       this.currentDesc = '';
//     } 
//     else if (params['categoryId']) {
//       this.searchQuery = '';
//       const id = Number(params['categoryId']);
      
//       if (this.categoryDictionary[id]) {
//         this.currentTitle = this.categoryDictionary[id].title;
//         this.currentDesc = this.categoryDictionary[id].desc;
//       } else {
//         this.currentTitle = 'מוצרים';
//         this.currentDesc = '';
//       }
//     } 
//     else {
//       this.searchQuery = '';
//       this.currentTitle = 'מוצרים';
//       this.currentDesc = '';
//     }
//   }

//   toggleDesc(): void {
//     this.isExpanded = !this.isExpanded;
//   }
//   // מקבלת את הסינונים מתפריט הצד ומעדכנת את ה-URL בלי לדרוס את הקטגוריה
//   onApplyFilters(filters: any) {
//     this.router.navigate([], {
//       relativeTo: this.route,
//       queryParams: {
//         minPrice: filters.minPrice !== 0 ? filters.minPrice : null, // אם זה 0, מסיר מה-URL
//         maxPrice: filters.maxPrice !== 1700 ? filters.maxPrice : null, // אם זה מקסימום, מסיר מה-URL
//         color: filters.color ? filters.color : null,
//         material: filters.material ? filters.material : null
//       },
//       queryParamsHandling: 'merge' // שומר על ה-categoryId או ה-q הקיים!
//     });
//   }

//   loadProducts(filters: any = {}): void {
//     this.isLoading = true;
//     this.errorMsg = '';
    
//     this.productservice.getProducts(filters).subscribe({
//       next: (res: ProductsResponse) => {
//         console.log('הנתונים שהגיעו מהשרת:', res); 
//         this.products = res.items ?? [];
//         this.totalCount = res.totalCount;
//         this.isLoading = false;
//         this.cdr.detectChanges(); 
//       },
//       error: (err) => {
//         console.error('טעינת מוצרים נכשלה', err);
//         this.errorMsg = 'לא הצלחנו לטעון מוצרים';
//         this.isLoading = false;
//         this.cdr.detectChanges(); 
//       },
//     });
//   }

//   onAddToCart(p: ProductModel) {
//     console.log('Add to cart:', p);
//   }

//   trackById(_index: number, item: ProductModel) {
//     return item.productsId;
//   }
// }
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { ProductService, ProductsResponse } from '../../Services/product-service';
import { ProductModel } from '../../Models/Products-Model';
import { ProductCard } from '../product-card/product-card';
import { ProductFilter } from '../product-filter/product-filter';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ProductCard, ProductFilter], 
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList implements OnInit {
  products: ProductModel[] = [];
  isLoading = false;
  errorMsg = '';
  totalCount = 0;

  isFilterSidebarOpen = false;

  currentTitle = '';
  currentDesc = '';
  searchQuery = ''; 
  isExpanded = false; 
  descMaxLength = 130; 

  // מערך שישמור אילו חומרים מסומנים כרגע
  selectedMaterials: string[] = [];

  // --- משתנים לגלילה אינסופית (Infinite Scroll) ---
  currentPage: number = 1; // העמוד הנוכחי שאנחנו נמצאים בו
  isLoadingMore: boolean = false; // האם אנחנו טוענים עכשיו עוד מוצרים בגלילה?
  hasMoreProducts: boolean = true; // האם נשארו עוד מוצרים בשרת?
  currentFilters: any = {}; // שומר את הסינון הנוכחי

  categoryDictionary: Record<number, { title: string, desc: string }> = {
    100: { title: 'טבעות', desc: 'מגוון ענק של טבעות מושלמות לנשים מחכות שתגידי להן I DO! אז מה הסגנון שלך? מראה שכבות נוטף סטייל שאי אפשר להתעלם ממנו או טבעת מכסף אלגנטית אחת שתתאים לכל לוק? יש לנו את הכל מהכל עבור טבעות כסף לאישה! החל מטבעת גל עם זרקונים מנצנצים שייתנו לאאוטפיט שלך טאץ\' של גלואו ועד לטבעת כסף עם אבן קריסטל צבעונית שתמשוך את כל המבטים. כסף סטרלינג 925, ציפוי זהב או רוז נחושת? אנחנו הכי בעד שתלכי על מיקס אנד מאץ\'. עכשיו נותר לך רק לבחור…' },
    105: { title: 'צמידים', desc: 'איפה קונים צמיד מושלם? יש לך ספק בכלל? ברור שבפנדורה! בואי לבחור את האחד שלך מבין כל האפשרויות של צמידים לאישה.בחרי צמיד כסף בנגל קשיח עם סוגרים בעיצובים שונים, צמידי כסף קלאסיים עם צ\'ארמס ותליונים,  החל מצמיד לינקים מגה-טרנדי מקולקציית Pandora me החדשה לנשים ועד לצמידי מומנטס אייקונים שתמיד כיף לשדרג עם צ\'ארמס חדשים, צמידי טניס משובצים בזרקונים מנצנצים או צמידי בנגל קשיחים ללוק על-זמני מנצח. זה המומנט להשיג את הפיס המושלם שיבטא את הסטייל האישי שלך ויקטוף את כל המחמאות. תיבת התכשיטים שלך מוסרת לך תודה 😊' },
    110: { title: 'צ\'ארמס', desc: 'הדבר שאנחנו הכי אוהבות לעשות? לחדש את צמיד המומנטס שלנו כמובן! בואי להוסיף צ\'ארמס חדשים שיספרו את הסיפור שלך ויכניסו ערימות של סטייל. צ\'ארמס משובצים בזרקונים מנצנצים, עם זכוכיות מוראנו, בציפוי רוז גולד או ציפוי זהב, קולקציות בלעדיות של דיסני, פרחים או בכלל חיות. יש לנו את הכל מהכל, רק תבחרי.' },
    115: { title: 'שרשראות', desc: 'כבר הוספת לתיבת התכשיטים שלך שרשרת כסף לינקים סופר-טרנדית מקולקציית Pandora me? ומה עם שרשרת מכסף מעודנת ועל-זמנית עם תליון לב בשילוב אבן קריסטל שתנצנץ למרחקים? תהיי בטוחה שיש לנו את סוגים שונים של שרשראות עם או בלי תליונים לבחירה. כל מה שאת צריכה כדי לקחת את הלוק שלך לגבהים חדשים של סטייל. רוצה המלצת סטיילינג רותחת עבור שרשראות כסף? לכי על מראה שכבות עדכני עם שילובי מתכות – אין יותר שיק מכסף סטרלינג 925, רוז גולד וציפוי זהב ביחד. אפשר להגיד לך כבר מעכשיו תתחדשי?' },
    120: { title: 'עגילים', desc: 'עגילים – הם משלימים את הלוק, תמיד בולטים לעין ומבליטים את יופייך הטבעי. מחפשת זוג עגילים לאישה מנצנצים מכסף שיקפיצו לך את הלוק ברגע? זה המומנט להכניס לתיבת התכשיטים שלך פיסים על-זמניים שתשמחי לענוד בכל הזדמנות אפשרית. עגיל כסף 925 מנצנץ ומעודן שיתאים לכל אאוטפיט או עגילים מכסף עם אבן קריסטל צבעונית ומרשימה שתיקח את הסטייל שלך לשלב הבא. עגילי כסף צורת לב מרגשת, פרחים מתוקים שירעננו את הלוק, כוכבים מנצנצים או בכלל פרפרים צבעוניים – יש לנו את כל האפשרויות שבעולם לנשים. איך שלא תסתכלי על זה, עגילי נשים זה מאסט, יו וולקאם.' },
    130: { title: 'תכשיטי חריטה', desc: 'הפכו את המתנה שלכם לעוד יותר אישית עם תכשיטי חריטה ייחודיים לאישה. שלל צמידי חריטה, תליונים לחריטה לשרשראות ועוד. הוסיפו חריטה של ראשי תיבות, תאריכים מיוחדים או מסר מרגש ליקירים שלכם. בחרו את תכשיטים עם חריטה אישית לנשים בעיצוב אישי שהיא הכי תאהב ועצבו אותו בנוחות ובקלות בכמה צעדים פשוטים.' },
    135: { title: 'NEW COLLECTION', desc: 'כל הפריטים החדשים שנחתו בפנדורה וחייבים ליהיות שלך - מחכים לך כאן!\n החל  מעגילי חישוק שישאירו חותם ועד לצ\'ארמס שישדרגו את צמיד המומנטס האהוב אפשר כבר להגיד לך תתחדשי?' }
  };

  constructor(
    private productservice: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.handleHeaderDisplay(params); 
      
      if (params['material']) {
        this.selectedMaterials = params['material'].split(',');
      } else {
        this.selectedMaterials = [];
      }

      this.loadProducts(params);
    });
  }

  toggleMaterial(materialValue: string, event: any): void {
    if (event.target.checked) {
      this.selectedMaterials.push(materialValue);
    } else {
      this.selectedMaterials = this.selectedMaterials.filter(m => m !== materialValue);
    }

    const materialParam = this.selectedMaterials.length > 0 ? this.selectedMaterials.join(',') : null;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { material: materialParam },
      queryParamsHandling: 'merge' 
    });
  }

  handleHeaderDisplay(params: any): void {
    this.isExpanded = false; 

    if (params['q']) {
      this.searchQuery = params['q'];
      this.currentTitle = '';
      this.currentDesc = '';
    } 
    else if (params['categoryId']) {
      this.searchQuery = '';
      const id = Number(params['categoryId']);
      
      if (this.categoryDictionary[id]) {
        this.currentTitle = this.categoryDictionary[id].title;
        this.currentDesc = this.categoryDictionary[id].desc;
      } else {
        this.currentTitle = 'מוצרים';
        this.currentDesc = '';
      }
    } 
    else {
      this.searchQuery = '';
      this.currentTitle = 'מוצרים';
      this.currentDesc = '';
    }
  }

  toggleDesc(): void {
    this.isExpanded = !this.isExpanded;
  }

  onApplyFilters(filters: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        minPrice: filters.minPrice !== 0 ? filters.minPrice : null, 
        maxPrice: filters.maxPrice !== 1700 ? filters.maxPrice : null, 
        color: filters.color ? filters.color : null,
        material: filters.material ? filters.material : null
      },
      queryParamsHandling: 'merge' 
    });
  }

  // --- הפונקציה המעודכנת שתומכת גם בגלילה וגם בטעינה רגילה ---
  loadProducts(filters: any = {}, isAppend: boolean = false): void {
    this.currentFilters = filters; // שומרים את הסינון לשימוש בזמן גלילה

    if (isAppend) {
      this.isLoadingMore = true;
    } else {
      this.isLoading = true;
      this.currentPage = 1;
      this.hasMoreProducts = true; 
    }
    this.errorMsg = '';
    
    // מוסיפים לבקשה לשרת את מספר העמוד
    const apiFilters = { ...filters, position: this.currentPage };

    this.productservice.getProducts(apiFilters).subscribe({
      next: (res: any) => { // שמתי any כדי שיתמוך במבנה החדש שכולל totalCount / hasNext
        console.log('הנתונים שהגיעו מהשרת:', res); 
        
        if (res && res.items) {
          if (isAppend) {
            // אם גוללים - מדביקים את הנתונים החדשים בסוף המערך הקיים
            this.products = [...this.products, ...res.items];
          } else {
            // טעינה רגילה - מחליפים את המערך
            this.products = res.items;
          }
          
          this.totalCount = res.totalCount || res.total || 0;

          // בודקים אם הגענו לסוף
          if (this.products.length >= this.totalCount || res.hasNext === false || res.items.length === 0) {
            this.hasMoreProducts = false;
          }
        } else {
          if (!isAppend) {
            this.products = [];
            this.totalCount = 0;
          }
          this.hasMoreProducts = false;
        }
        
        this.isLoading = false;
        this.isLoadingMore = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('טעינת מוצרים נכשלה', err);
        this.errorMsg = 'לא הצלחנו לטעון מוצרים';
        this.isLoading = false;
        this.isLoadingMore = false;
        this.cdr.detectChanges(); 
      },
    });
  }

  // --- פונקציית ההאזנה לגלילה ---
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.isLoading || this.isLoadingMore || !this.hasMoreProducts) {
      return;
    }

    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollPosition >= documentHeight - 400) {
      this.currentPage++;
      this.loadProducts(this.currentFilters, true);
    }
  }

  onAddToCart(p: ProductModel) {
    console.log('Add to cart:', p);
  }

  trackById(_index: number, item: ProductModel) {
    return item.productsId;
  }
}