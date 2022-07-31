import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IcartItem } from 'src/app/interfaces/cartItem';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import * as AppUtil from "../../../common/app.util";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = this._authService.isUserLoggedIn();
  cartItems!: IcartItem[];
  subscribtion!: Subscription;
  sum = 0;
  src = AppUtil.API_LINK;

  constructor(public _authService: AuthService, private _router: Router,
    public productService: ProductService, private _cartService: CartService) {
    this.loggedIn = this._authService.isUserLoggedIn();
  }

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
  logout(): void {
    this._authService.logout();
    this._router.navigate(['/']);
  }
  deleteProduct(cartItemId: string) {
    if (confirm('Are you sure you want to delete this product?'))
      this._cartService.deleteProduct(cartItemId).subscribe(
        () => {
          this._cartService.updateProductList();
        }
      );
  }
}
