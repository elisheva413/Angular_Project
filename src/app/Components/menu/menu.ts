import { Component, OnInit, inject, HostListener } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { RouterModule, Router, NavigationEnd } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { filter } from 'rxjs/operators';
import { CartService } from '../../Services/cart-service';
import { CommonModule } from '@angular/common'; // <--- זה מה שהיה חסר בשביל ש-*ngIf יעבוד!

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  standalone: true,
  imports: [MenubarModule, MenuModule, RouterModule, FormsModule]
})
export class Menu implements OnInit {
  private router = inject(Router);
  private cartService = inject(CartService);

  cartItemCount: number = 0;

  items: MenuItem[] | undefined;
  userMenuItems: MenuItem[] | undefined; 
  searchQuery: string = '';

  isHeaderHidden = false; 
  isScrolled = false; 
  lastScrollTop = 0; 
  isHomePage = false; 
  isTransparent = false; 

  ngOnInit() {
    // הפונקציה המעודכנת - עכשיו מנקה גם סימני שאלה וגם סולמיות (#)
    const checkRoute = (url: string) => {
      // כאן הקסם: מנקים את ה-URL מכל מה שבא אחרי ? או #
      const cleanUrl = url.split('#')[0].split('?')[0]; 
      
      this.isHomePage = cleanUrl === '/' || cleanUrl === '' || cleanUrl === '/home';
      this.checkTransparency();
    };

    checkRoute(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      checkRoute(event.urlAfterRedirects || event.url);
    });

    this.userMenuItems = [
      { label: 'אזור אישי', icon: 'pi pi-user', routerLink: '/profile' },
      { label: 'התנתקות', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];

    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = items.reduce((sum, item) => sum + item.selectedQuantity, 0);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    this.isScrolled = currentScroll > 50;
    this.checkTransparency(); 

    if (currentScroll <= 50) {
      this.isHeaderHidden = false;
      this.lastScrollTop = currentScroll;
      return;
    }

    if (currentScroll > this.lastScrollTop) {
      this.isHeaderHidden = true; 
    } else {
      this.isHeaderHidden = false; 
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  checkTransparency() {
    // עכשיו isHomePage יישאר true גם אם יש #collections בכתובת
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