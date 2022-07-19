import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products!: IProduct[];
  constructor(private _productService: ProductService) {
   this.products=  this._productService.getProducts();
   }

  ngOnInit(): void {
  }

}
