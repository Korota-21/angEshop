import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';
import * as AppUtil from "../../common/app.util";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  colors = this._productService.colorsList;
  tags = this._productService.tagsList;
  productCount = 0;
  products!: IProduct[];
  subscribtion!: Subscription;
  pagination = 12
  page= 1
  src = AppUtil.API_LINK;

  constructor(private _productService: ProductService, private _activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getProduct();
    this.subscribtion = this._productService.productsChange.subscribe((products: IProduct[]) => {
      this.products = products;
    })
  }
  getProduct() {
    this._activateRoute.queryParams.subscribe((params: any) => {


          (params.page) ? this.page = params.page : 1;
      this._productService.getProductList(this.pagination, params.page, true, params.colors, params.tags).subscribe(
        (res) => {
          this.productCount = res.count
          this.products = res.products;
          this.pages(this.productCount)
        }
      );
    })
  }
  pages(count: number) {
    count = Math.ceil(count / this.pagination)
    let res = []
    for (let i = 1; i <= count; i++) {
      res.push(i);
    }
    return res;
  }

  paginate(page: number) {
    this.page = page;
    this.router.navigate(
      ['.'],
      { relativeTo: this._activateRoute, queryParams: {page: this.page} }
    );
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
