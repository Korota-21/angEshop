import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';
import { WishListService } from 'src/app/services/wish-list/wish-list.service';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {

  product!: IProduct;

  constructor(private _activateRoute: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router, private _wishListService: WishListService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this._activateRoute.params.subscribe((params) => {

      this._productService.getProduct(params['id']).subscribe(
        product => {
          if (!product || product.quantity == 0)
            this._router.navigate(['/']);
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
  addToWishList() {
    this._wishListService.addProduct(this.product._id).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
}


