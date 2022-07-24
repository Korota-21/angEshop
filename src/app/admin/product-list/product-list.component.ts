import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: IProduct[];
  subscribtion!: Subscription;
  searchText!: string;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();

  }
  getProduct() {
    this._productService.getProductList().subscribe(
      (products) => {
        this.products = products;
      }
    );
  }
}
