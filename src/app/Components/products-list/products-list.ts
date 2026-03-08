import { ProductService } from '../../Services/product-service';
import { ProductModel } from '../../Models/Products-Model'; // ודאי שזה Products עם s
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart-service';

@Component({
  selector: 'app-products-list',
  standalone: true, 
  imports: [
    CommonModule, 
    DataViewModule, 
    SelectButtonModule, 
    TagModule, 
    ButtonModule, 
    FormsModule
  ],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products: ProductModel[] = [];
  layout: string = 'grid'; 
  isLoading = false; 
  options: any[] = [
    { label: 'רשימה', value: 'list', icon: 'pi pi-list' },
    { label: 'גריד', value: 'grid', icon: 'pi pi-th-large' }
  ];

  ngOnInit() {
    this.loadProducts();
  }

 
  loadProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: response => {
        console.log('Products loaded:', response);
        this.products = response;
      },
      error: err => {
        console.error('Error loading products', err);
      },
      complete: () => this.isLoading = false
    });
  }

  
  trackByProduct(index: number, product: ProductModel) {
    return product.productId;
  }


  addToCart(product: ProductModel) {
    const cartItem = {
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      imgUrl: product.imgUrl,
      selectedQuantity: 1
    };

    this.cartService.addToCart(cartItem);
    console.log('Product added to cart:', product.productName);
    
  }

  
  getSeverity(product: ProductModel) {
    return product.inventoryStatus === 'INSTOCK' ? 'success' : 'danger';
  }
}