import { Component, OnInit, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { RouterModule, Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; // <--- חובה להוסיף את זה בשביל ה-ngModel!

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  standalone: true,
  imports: [MenubarModule, MenuModule, RouterModule, FormsModule] // הוספנו FormsModule
})
export class Menu implements OnInit {
  private router = inject(Router);

  items: MenuItem[] | undefined;
  userMenuItems: MenuItem[] | undefined; 
  
  // משתנה שישמור את מה שהמשתמש מקליד בחיפוש
  searchQuery: string = '';

  ngOnInit() {
    // התפריט הראשי המקורי שלך (נשאר בדיוק אותו דבר)
    this.items = [ /*... הקוד שלך ...*/ ];

    this.userMenuItems = [
      { label: 'אזור אישי', icon: 'pi pi-user', routerLink: '/profile' },
      { label: 'התנתקות', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];
  }

  // הפונקציה שמופעלת כשהמשתמש לוחץ אנטר או על זכוכית המגדלת
  onSearch() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      // מנתב לעמוד המוצרים ומוסיף את מילת החיפוש ל-URL (למשל: products?q=לב)
      this.router.navigate(['/products'], { queryParams: { q: this.searchQuery.trim() } });
      this.searchQuery = ''; // מאפס את שורת החיפוש אחרי הלחיצה
    }
  }
 


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}