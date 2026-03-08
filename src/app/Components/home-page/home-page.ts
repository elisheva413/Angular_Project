import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  // בהמשך נוסיף לכאן לוגיקה אם נצטרך, כרגע ה-CSS עושה את רוב העבודה!
}