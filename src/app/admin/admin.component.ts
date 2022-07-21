import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../interfaces/product';
import { IUser } from '../interfaces/user';
import { AuthService } from '../services/auth/auth.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products!: IProduct[];
  subscribtion!: Subscription;

  searchText!: string;
  constructor(private _productService: ProductService) {

  }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this._productService.getProductList().subscribe(
      (products) => {
        this.products = products;
      }
    );
  }

  }


