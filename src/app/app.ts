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


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './Components/menu/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Menu, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}