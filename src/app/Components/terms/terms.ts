import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router'; 
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-terms',
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink,
    InputTextModule, 
    PasswordModule, 
    ButtonModule, 
    FloatLabelModule,
    DividerModule 
  ],
  templateUrl: './terms.html',
  styleUrl: './terms.scss',
})
export class Terms {

}
