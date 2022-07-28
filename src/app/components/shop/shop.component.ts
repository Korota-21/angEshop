import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

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
  pagination = 9
  queryParams: { tags: string[], colors: string[], page: number, } =
    { tags: [], colors: [], page: 1, }
  constructor(private _productService: ProductService, private _activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getProduct();
    this.subscribtion = this._productService.productsChange.subscribe((products: IProduct[]) => {
      this.products = products;
    })
  }
  getProduct() {
    this._activateRoute.queryParams.subscribe((params: any) => {
      if (params.tags)
        params.tags.forEach((element: string) => {
          this.queryParams.tags.push(element)
        })
        this.queryParams.page = params.page
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
  onChangeTag(name: string, ev: any) {
    console.log(this.queryParams);
    if (ev.checked) {
      this.queryParams.tags.push(name);
    } else {
      this.queryParams.tags = this.queryParams.tags.filter(t => t !== name)
    }

    this.router.navigate(
      ['.'],
      { relativeTo: this._activateRoute, queryParams: { 'tags': this.queryParams.tags } }
    );
  }
  paginate(page: number) {
    this.queryParams.page = page;
    this.router.navigate(
      ['.'],
      { relativeTo: this._activateRoute, queryParams: this.queryParams }
    );
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
