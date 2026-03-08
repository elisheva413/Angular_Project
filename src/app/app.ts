import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { Button } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { Menu } from './Components/menu/menu';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, Button, Menubar, Menu, CommonModule], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Shop_Project');
  
  openSection: string = ''; 

  toggleSection(section: string) {
    this.openSection = this.openSection === section ? '' : section;
  }
}