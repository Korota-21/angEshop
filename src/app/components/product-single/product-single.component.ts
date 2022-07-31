import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { WishListService } from 'src/app/services/wish-list/wish-list.service';
import * as AppUtil from "../../common/app.util";

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {

  product!: IProduct;
  message =
    {
      active: false,
      message: "",
      class: ""
    };
    src = AppUtil.API_LINK;

  constructor(private _activateRoute: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router, private _wishListService: WishListService,
    private _cartService: CartService
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

  addToCart(quantity: string) {

    this._cartService.addProduct(this.product._id, quantity).subscribe(
      res => {
        this.messageUpdate("the product has been added successfully to the cart", "alert-success")
        this._cartService.updateProductList();

      },

      err => {
        this.messageUpdate("the product has already been added", "alert-info")
      }
    );
  }
  addToWishList() {
    this._wishListService.addProduct(this.product._id).subscribe(
      res => {
        this.messageUpdate("the product has been added successfully to the wish list", "alert-success")
      },

      err => {
        this.messageUpdate("the product has already been added", "alert-info")
      }
    );
  }
  messageUpdate(message: string, type: "alert-info" | "alert-success") {
    this.message.message = message;
    this.message.class = type;
    this.message.active = true;

  }
}


