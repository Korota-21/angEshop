import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';
import * as AppUtil from "../../common/app.util";

@Component({
  selector: 'app-view-product-admin',
  templateUrl: './view-product-admin.component.html',
  styleUrls: ['./view-product-admin.component.css']
})
export class ViewProductAdminComponent implements OnInit {
  product!: IProduct;
  src = AppUtil.API_LINK;

  constructor(private _activateRoute: ActivatedRoute,
     private _productService: ProductService,
      private _router: Router,
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this._activateRoute.params.subscribe((params) => {
      this._productService.getProduct(params['id']).subscribe(
        product => {
          if (!product)
            this._router.navigate(['/admin']);
            this.product = product
          },
          err => console.log(err)
          );
        })
      }
      deleteProduct(productsId: string) {
        if (confirm('Are you sure you want to delete this product?'))
        this._productService.deleteProduct(productsId).subscribe(
          () => {
            this._productService.updateProductList();
            this._router.navigate(['/admin']);

        }
      );

    }

}
