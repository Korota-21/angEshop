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
  wishMessage =
    {
      active: false,
      message: "",
      class: ""
    };
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

  addToWishList() {
    this._wishListService.addProduct(this.product._id).subscribe(
      res => {
        this.wishMessageUpdate("the product has been added successfully to the wish list", "alert-success")
      },

      err => {
        this.wishMessageUpdate("the product has already been added", "alert-info")
      }
    );
  }
  wishMessageUpdate(message: string, type: "alert-info" | "alert-success") {
    this.wishMessage.message = message;
    this.wishMessage.class = type;
    this.wishMessage.active = true;

  }
}


