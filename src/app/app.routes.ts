import { Routes } from '@angular/router';
import { HomePage } from './Components/home-page/home-page';
import { ProductsList } from './Components/products-list/products-list';
import { SingleProduct } from './Components/single-product/single-product';
import { GiftCard } from './Components/gift-card/gift-card'; 
import { Cart } from './Components/cart/cart';
import { LoginComponent } from './Components/login/login';
import { RegisterComponent } from './Components/register/register';
import { StoreLocatorComponent } from './Components/store-locator/store-locator';
import { ProfileComponent } from './Components/profile/profile'; 
import { Terms } from './Components/terms/terms';
import { AdminDashboardComponent } from './Components/admin/admin-dashboard/admin-dashboard';
import { ProductManagementComponent } from './Components/admin/product-management/product-management';
import { authGuard } from './Components/auth-guard'; 


export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'products', component: ProductsList },
    { path: 'products/:id', component: SingleProduct},
    { path: 'gift-card', component: GiftCard },
    { path: 'cart', component: Cart },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent }, 
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    { path: 'stores', component: StoreLocatorComponent },
    { path: 'terms', component: Terms },
    { path: 'admin', component: AdminDashboardComponent },
    { path: 'admin/products', component: ProductManagementComponent },
    { 
      path: 'update-profile', 
      component: ProfileComponent, 
      canActivate: [authGuard] 
    },
    { path: 'login', component: LoginComponent },
    { path: 'cart', component: Cart },
    { path: '**', redirectTo: '' },// ה-Wildcard חייב להישאר אחרון!

];




