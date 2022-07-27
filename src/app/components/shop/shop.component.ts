import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products!: IProduct[];
  subscribtion!: Subscription;
  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();
    this.subscribtion = this._productService.productsChange.subscribe((products: IProduct[]) => {
      this.products = products;
    })
  }
  getProduct() {

    this._productService.getProductList(50,1,true).subscribe(
      (products) => {
        this.products = products;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
