import { Injectable } from '@angular/core';
import { IProduct } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: IProduct[] = [
    {
      _id: "58764",
      image: "111.jpg",
      name: "shirt",
      price: "11",
      quantity: 55,
      createdAt: "202005200000",
      updatedAt: "2020/05/20"
    },
    {
      _id: "1234",
      image: "p-2.jpg",
      name: "hh",
      price: "22",
      quantity: 55,
      createdAt: "2020/05/20",
      updatedAt: "2020/05/20"
    },
    {
      _id: "58764",
      image: "pants",
      name: "pants",
      price: "33",
      quantity: 55,
      createdAt: "2020/05/20",
      updatedAt: "2020/05/20"
    },
  ];
  constructor() { }
  getProducts(): IProduct[] {
    return this.products;
  }
}
