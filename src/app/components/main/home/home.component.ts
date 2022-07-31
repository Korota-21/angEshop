import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';
import * as AppUtil from "../../../common/app.util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products!: IProduct[];
  subscribtion!: Subscription;
  src = AppUtil.API_LINK;
  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();
    this.subscribtion = this._productService.productsChange.subscribe((products: IProduct[]) => {
      this.products = products;
    })
  }
  getProduct() {

    this._productService.getProductList(8,1,true).subscribe(
      (res) => {
        this.products = res.products;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;

}
