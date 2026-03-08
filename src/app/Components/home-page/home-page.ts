import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router'; // ייבוא הניווט
import { Menu } from '../menu/menu'; 

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet, Menu], // חובה להוסיף כאן את RouterLink ו-RouterOutlet
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage { }