import { Routes } from '@angular/router';

import { HomePage } from './Components/home-page/home-page';
import { ProductsList } from './Components/products-list/products-list';
import { SingleProduct } from './Components/single-product/single-product';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'products', component: ProductsList },
    { path: 'a/b', component: SingleProduct},

];
