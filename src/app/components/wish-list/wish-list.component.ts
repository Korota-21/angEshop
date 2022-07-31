import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { IProduct } from 'src/app/interfaces/product';
import { WishListService } from 'src/app/services/wish-list/wish-list.service';
import * as AppUtil from "../../common/app.util";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishList!: IProduct[]
  subscribtion!: Subscription;
  src = AppUtil.API_LINK;

  constructor(private _wishListService: WishListService,) { }

  ngOnInit(): void {
    this.getWishList()
    this.subscribtion = this._wishListService.productsChange.subscribe((products:IProduct[]) => {
      this.wishList = products;
    })
  }
  getWishList() {
    this._wishListService.getWishList().subscribe(
      (res) => {
        console.log(res);

        this.wishList = res;
      }
    );
  }
  deleteProduct(productsId: string) {
    if (confirm('Are you sure you want to delete this product?'))
      this._wishListService.deleteProduct(productsId).subscribe(
        () => {
          this._wishListService.updateProductList();
        }
      );
  }
}
