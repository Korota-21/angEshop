import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IcartItem } from 'src/app/interfaces/cartItem';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import * as AppUtil from "../../common/app.util";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems!: IcartItem[];
  subscribtion!: Subscription;
  sum = 0;
  shipping = 0;
  src = AppUtil.API_LINK;

  constructor(public productService: ProductService, private _cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
    this.subscribtion = this._cartService.cartChange.subscribe((cartItems: IcartItem[]) => {
      this.cartItems = cartItems;
    })
  }
  getCartItems() {
    this._cartService.getCartList().subscribe(
      (res) => {
        this.cartItems = res;
        this.getCostSum();
      }, (err) => { console.log(err); }
    );
  }
  getCostSum() {
    this.cartItems.forEach(item => {
      this.sum += +item.product.price * +item.quantity
    });
  }

  deleteProduct(cartItemId: string) {
    if (confirm('Are you sure you want to delete this product?'))
      this._cartService.deleteProduct(cartItemId).subscribe(
        () => {
          this._cartService.updateProductList();
        }
      );
  }
  update_cart(cart_itemID: string,quantity: string) {
    this._cartService.updateProduct(cart_itemID,quantity).subscribe(
      (res) => {
        // this.cartItems = res;
        this._cartService.updateProductList();
        console.log(res);
        this.getCostSum();
      }, (err) => { console.log(err); }
    );
  }
}
