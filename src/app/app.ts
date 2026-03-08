<<<<<<< HEAD
// import { Component, signal } from '@angular/core';
// import {  RouterOutlet } from '@angular/router';
// import {Button} from 'primeng/button'
// import { Menubar } from 'primeng/menubar';
// import { Menu } from './Components/menu/menu';
// import { routes } from './app.routes';
// import { RouterModule, Routes } from '@angular/router';
// import { NgModule } from '@angular/core';




// import { HomePage } from './Components/home-page/home-page';
// import { ProductsList } from './Components/products-list/products-list';

 
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet,Button, Menubar,Menu, RouterOutlet,RouterLink] ,
//   templateUrl: './app.html',
//   styleUrl: './app.scss'
// })
// export class App {
//   protected readonly title = signal('Shop_Project');
// }


// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Menu } from './Components/menu/menu';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [Menu, RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss',
// })
// export class App {}

import { Component, inject ,signal} from '@angular/core'; // הוספנו את inject
import { CommonModule } from '@angular/common'; // חובה בשביל ה-HTML של ההודעות
import { RouterOutlet , RouterModule} from '@angular/router';
import { Menu } from './Components/menu/menu';
import { CartService } from './Services/cart-service'; // ודאי שהנתיב נכון אצלך
import { footer } from '@primeuix/themes/aura/confirmpopup';
import { FooterComponent } from './Components/footer/footer';
import { Button } from 'primeng/button';
import { Menubar } from 'primeng/menubar';


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet,RouterModule,CommonModule , RouterOutlet,FooterComponent, Button, Menubar,CommonModule], // הוספנו את CommonModule לכאן
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // חייב להיות public כדי ש-app.html יוכל להאזין לו
  public cartService = inject(CartService);
  protected readonly title = signal('Shop_Project');
  
  openSection: string = ''; 

  toggleSection(section: string) {
    this.openSection = this.openSection === section ? '' : section;
  }
}
