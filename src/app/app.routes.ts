import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login';
import { RegisterComponent } from './Components/register/register';
import { StoreLocatorComponent } from './Components/store-locator/store-locator';
import { Terms } from './Components/terms/terms';
import { AdminDashboardComponent } from './Components/admin/admin-dashboard/admin-dashboard';
import { ProductManagementComponent } from './Components/admin/product-management/product-management';
import { ProfileComponent } from './Components/profile/profile'; 
import { authGuard } from './Components/auth-guard'; 
import { Cart } from './Components/cart/cart';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent }, 
  { path: 'stores', component: StoreLocatorComponent },
  { path: 'terms', component: Terms },
  { 
    path: 'products', 
    loadComponent: () => import('./Components/products-list/products-list').then(m => m.ProductsList) 
  },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/products', component: ProductManagementComponent },
  { 
    path: 'update-profile', 
    component: ProfileComponent, 
    canActivate: [authGuard] 
  },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: Cart },
];