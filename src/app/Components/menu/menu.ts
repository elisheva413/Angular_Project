// import { Component, OnInit, inject } from '@angular/core';
// import { MenubarModule } from 'primeng/menubar';
// import { MenuModule } from 'primeng/menu';
// import { MenuItem } from 'primeng/api';
// import { RouterModule, Router } from '@angular/router'; 
// import { FormsModule } from '@angular/forms'; // <--- חובה להוסיף את זה בשביל ה-ngModel!

// @Component({
//   selector: 'app-menu',
//   templateUrl: './menu.html',
//   styleUrl: './menu.scss',
//   standalone: true,
//   imports: [MenubarModule, MenuModule, RouterModule, FormsModule] // הוספנו FormsModule
// })
// export class Menu implements OnInit {
//   private router = inject(Router);

//   items: MenuItem[] | undefined;
//   userMenuItems: MenuItem[] | undefined; 
  
//   // משתנה שישמור את מה שהמשתמש מקליד בחיפוש
//   searchQuery: string = '';

//   ngOnInit() {
//     // התפריט הראשי המקורי שלך (נשאר בדיוק אותו דבר)
//     this.items = [ /*... הקוד שלך ...*/ ];

//     this.userMenuItems = [
//       { label: 'אזור אישי', icon: 'pi pi-user', routerLink: '/profile' },
//       { label: 'התנתקות', icon: 'pi pi-sign-out', command: () => this.logout() }
//     ];
//   }

//   // הפונקציה שמופעלת כשהמשתמש לוחץ אנטר או על זכוכית המגדלת
//   onSearch() {
//     if (this.searchQuery && this.searchQuery.trim() !== '') {
//       // מנתב לעמוד המוצרים ומוסיף את מילת החיפוש ל-URL (למשל: products?q=לב)
//       this.router.navigate(['/products'], { queryParams: { q: this.searchQuery.trim() } });
//       this.searchQuery = ''; // מאפס את שורת החיפוש אחרי הלחיצה
//     }
//   }
 


//   logout() {
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('userRole');
//     this.router.navigate(['/login']);
//   }
// }
import { Component, OnInit, inject, HostListener } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { RouterModule, Router, NavigationEnd } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { filter } from 'rxjs/operators'; // <--- יבוא חדש!

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  standalone: true,
  imports: [MenubarModule, MenuModule, RouterModule, FormsModule]
})
export class Menu implements OnInit {
  private router = inject(Router);

  items: MenuItem[] | undefined;
  userMenuItems: MenuItem[] | undefined; 
  searchQuery: string = '';

  // --- משתנים חכמים לניהול התפריט ---
  isHeaderHidden = false; 
  isScrolled = false; 
  lastScrollTop = 0; 
  isHomePage = false; // מזהה אם אנחנו בעמוד הבית
  isTransparent = false; // קובע מתי ההדר שקוף לחלוטין

  ngOnInit() {
    // 1. האזנה לשינויי ניתוב (כדי לדעת אם אנחנו בעמוד הבית)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isHomePage = event.url === '/' || event.url === '/home';
      this.checkTransparency();
    });

    // 2. בדיקה ראשונית בעת טעינת האתר
    this.isHomePage = this.router.url === '/';
    this.checkTransparency();

    // התפריטים הקיימים שלך
    this.items = []; // השארתי ריק כי ה-nav שלך ב-HTML
    this.userMenuItems = [
      { label: 'אזור אישי', icon: 'pi pi-user', routerLink: '/profile' },
      { label: 'התנתקות', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];
  }

  // --- פונקציית ההאזנה לגלילה שעושה את הקסם ---
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // בודק אם עברנו 50 פיקסלים
    this.isScrolled = currentScroll > 50;
    this.checkTransparency(); // מעדכן שקיפות

    // אם אנחנו ממש למעלה - תמיד תציג
    if (currentScroll <= 50) {
      this.isHeaderHidden = false;
      this.lastScrollTop = currentScroll;
      return;
    }

    // גוללים למטה
    if (currentScroll > this.lastScrollTop) {
      this.isHeaderHidden = true; // העלמה!
    } 
    // גוללים למעלה
    else {
      this.isHeaderHidden = false; // חזרה חלקה!
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  checkTransparency() {
    // ההדר שקוף אך ורק אם אנחנו בעמוד הבית ועדיין לא גללנו!
    this.isTransparent = this.isHomePage && !this.isScrolled;
  }

  onSearch() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.router.navigate(['/products'], { queryParams: { q: this.searchQuery.trim() } });
      this.searchQuery = ''; 
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}