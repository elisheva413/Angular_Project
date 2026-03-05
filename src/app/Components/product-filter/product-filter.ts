import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.scss'
})
export class ProductFilter {
  @Input() productsCount: number = 0;
  @Output() onFilter = new EventEmitter<any>();

  isOpen: boolean = false;
  selectedMaterial: string = '';
  selectedColor: string = '';
  minPrice: number = 0;
  maxPrice: number = 1700;
  maxLimit: number = 1700;

  materials = [
    { name: 'כסף סטרלינג', value: 'כסף סטרלינג', cssClass: 'mat-silver' },
    { name: 'כסף משולב זהב 14k', value: 'כסף משולב זהב 14k', cssClass: 'mat-silver-gold' },
    { name: 'כסף בציפוי זהב 14k', value: 'כסף בציפוי זהב 14k', cssClass: 'mat-silver-gold-plated' },
    { name: 'ציפוי זהב 14k', value: 'ציפוי זהב 14k', cssClass: 'mat-gold' }
  ];

  colors = [
    { name: 'כסף', value: 'כסף', cssClass: 'silver' },
    { name: 'זהב', value: 'זהב', cssClass: 'gold' },
    { name: 'רוז', value: 'רוז', cssClass: 'rose-gold' }
  ];

  onMinChange() { if (this.minPrice > this.maxPrice) this.minPrice = this.maxPrice; }
  onMaxChange() { if (this.maxPrice < this.minPrice) this.maxPrice = this.minPrice; }

  toggleDrawer() { this.isOpen = !this.isOpen; }

  applyFilters() {
    const filters = {
      material: this.selectedMaterial || undefined,
      color: this.selectedColor || undefined,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    };
    this.onFilter.emit(filters);
    this.toggleDrawer();
  }

  resetFilters() {
    this.selectedMaterial = '';
    this.selectedColor = '';
    this.minPrice = 0;
    this.maxPrice = this.maxLimit;
    this.onFilter.emit({ material: undefined, color: undefined, minPrice: undefined, maxPrice: undefined });
    this.toggleDrawer();
  }
}