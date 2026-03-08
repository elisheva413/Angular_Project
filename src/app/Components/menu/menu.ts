import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu'; 
import { MenuItem } from 'primeng/api';
import { RouterModule, Router } from '@angular/router'; 
import { CartService } from '../../Services/cart-service';
import { CartItem } from '../../Models/Cart-Model';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  standalone: true,
  imports: [CommonModule, MenubarModule, MenuModule, RouterModule] 
})

export class Menu implements OnInit {
  private router = inject(Router); 
  private cartService = inject(CartService);
  items: MenuItem[] | undefined; 
  userMenuItems: MenuItem[] | undefined; 
  cartCount: number = 0; 

  ngOnInit() {
    this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });

    
    this.items = [
      { label: 'Home', icon: 'pi pi-home' },
      { label: 'Product', icon: 'pi pi-star' },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          { label: 'Components', icon: 'pi pi-bolt' },
          { label: 'Blocks', icon: 'pi pi-server' },
          { label: 'UI Kit', icon: 'pi pi-pencil' },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              { label: 'Apollo', icon: 'pi pi-palette' },
              { label: 'Ultima', icon: 'pi pi-palette' }
            ]
          }
        ]
      },
      { label: 'Contact', icon: 'pi pi-envelope' }
    ];

    this.userMenuItems = [
      {
        label: 'אזור אישי',
        icon: 'pi pi-user',
        routerLink: '/profile' 
      },
      {
        label: 'התנתקות',
        icon: 'pi pi-sign-out',
        command: () => this.logout() 
      }
    ];
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}