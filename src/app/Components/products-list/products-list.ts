// import { ProductService } from '../../Services/product-service';
// import { ProductModel } from '../../Models/Prodects-Model';
// import { Component, OnInit, inject, signal } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { DataViewModule, DataView } from 'primeng/dataview';
// import { SelectButtonModule, SelectButton } from 'primeng/selectbutton';
// import { TagModule } from 'primeng/tag';
// import { ButtonModule } from 'primeng/button';
// @Component({
//   selector: 'app-products-list',
//   imports: [DataView, SelectButton],
//   templateUrl: './products-list.html',
//   styleUrl: './products-list.scss',
// })
// export class ProductsList {
//  private productService = inject(ProductService);
//  options: any[] = ['list', 'grid'];

//   products:ProductModel[]=[]
//   constructor(private productservice: ProductService){}

//   ngOnInit(){
//     this.productservice.getAllProducts().subscribe(response=>{
//       console.log(response);
//       this.products=response;
      

//     })
//   }


// }
import { ProductService } from '../../Services/product-service';
import { ProductModel } from '../../Models/Prodects-Model';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
// import { Product } from '@/domain/product';


@Component({
  selector: 'app-products-list',
     imports: [DataViewModule, SelectButtonModule, TagModule, ButtonModule, FormsModule],

  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
// @Component({
//     standalone: true,
//     imports: [DataViewModule, SelectButtonModule, TagModule, ButtonModule, FormsModule],
//     providers: [ProductService]
// })
export class ProductsList implements OnInit {
    options: any[] = ['list', 'grid'];
    products:ProductModel[]=[]
  constructor(private productservice: ProductService){}
    layout: string = 'list'; // או 'grid' 

  ngOnInit(){
    this.productservice.getAllProducts().subscribe(response=>{
      console.log(response);
      this.products=response;
      

    })
  }

   
}


