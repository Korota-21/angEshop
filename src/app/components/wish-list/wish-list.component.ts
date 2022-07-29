import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { WishListService } from 'src/app/services/wish-list/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishList!: IProduct[]

  constructor(private _wishListService: WishListService) { }

  ngOnInit(): void {
    this.getWishList()

  }
  getWishList() {
    this._wishListService.getWishList().subscribe(
      (res) => {
        console.log(res);

        this.wishList = res;
      }
    );
  }
}
