import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Button} from 'primeng/button'
import { Menubar } from 'primeng/menubar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Button, Menubar] ,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Shop_Project');
}
