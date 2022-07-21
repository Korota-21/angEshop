import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../interfaces/product';
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
  searchUser!: string;
  users: any = [
    {
      _id: '1',
      name: 'user',
      email: 'user@user.com',
    },
    {
      _id: '1',
      name: 'Marwa',
      email: 'marwa@user.com',
    },
  ]
  constructor(private _productService: ProductService) {
    this.products = this._productService.getProducts();
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


