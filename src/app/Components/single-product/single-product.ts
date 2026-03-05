import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { ProductService } from '../../Services/product-service';
import { ProductModel } from '../../Models/Products-Model';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './single-product.html',
  styleUrl: './single-product.scss',
})
export class SingleProduct implements OnInit {
  product: ProductModel | null = null;

  isLoading = false;
  errorMsg = '';

  // גלריה: 0 = imgUrl, 1 = imgUrl2
  selectedIndex = 0;
  qty = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    const idStr = this.route.snapshot.paramMap.get('id');
    const id = Number(idStr);

    if (!idStr || Number.isNaN(id)) {
      this.errorMsg = 'מזהה מוצר לא תקין';
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';

    this.productService.getById(id).subscribe({
      next: (p) => {
        this.product = p;
        this.selectedIndex = 0;
        this.qty = 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('getProductById failed', err);
        this.errorMsg = 'לא הצלחתי לטעון את המוצר';
        this.isLoading = false;
      },
    });
  }

  // תמונות זמינות (imgUrl תמיד, imgUrl2 אופציונלי)
  get images(): string[] {
    if (!this.product) return [];
    const arr: string[] = [];
    if (this.product.imgUrl) arr.push(this.normalizeUrl(this.product.imgUrl));
    if (this.product.imgUrl2) arr.push(this.normalizeUrl(this.product.imgUrl2));
    return arr;
  }

  get mainImage(): string {
    const imgs = this.images;
    return imgs[this.selectedIndex] ?? '';
  }

  selectImage(i: number) {
    this.selectedIndex = i;
  }

  inc() {
    this.qty++;
  }

  dec() {
    if (this.qty > 1) this.qty--;
  }

  addToCart() {
    if (!this.product) return;
    console.log('Add to cart:', { product: this.product, qty: this.qty });
  }

  private normalizeUrl(url: string): string {
    if (!url) return '';
    return url.startsWith('/') ? url : `/${url}`;
  }
}