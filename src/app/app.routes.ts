import { Routes } from '@angular/router';
import { HomePage } from './Components/home-page/home-page';
import { ProductsList } from './Components/products-list/products-list';
import { SingleProduct } from './Components/single-product/single-product';
import { GiftCard } from './Components/gift-card/gift-card'; 
import { Cart } from './Components/cart/cart';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'products', component: ProductsList },
    { path: 'products/:id', component: SingleProduct},
    { path: 'gift-card', component: GiftCard },
    { path: 'cart', component: Cart },
    { path: '**', redirectTo: '' },// ה-Wildcard חייב להישאר אחרון!

];




