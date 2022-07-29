import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct } from 'src/app/interfaces/product';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private _rootURL = "http://localhost:8000/api/wishProduct"
  products!: IProduct[];
  public productsChange: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>(this.products);

  constructor( private _Http: HttpClient,private _authService: AuthService) { }
  private authHeader(token: string): { headers: HttpHeaders } {
    let headers_object = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    })
    let options = {
      headers: headers_object
    };
    return options;
  }

  getWishList(): Observable<IProduct[]> {
    let token = this._authService.getUserData().token;
    return this._Http.get<IProduct[]>(`${this._rootURL}`, this.authHeader(token));
  }
  updateProductList() {
    this.getWishList().subscribe((products) => {
      this.productsChange.next(products);
    });
  }
  deleteProduct(productID: string): Observable<string> {
    let token = this._authService.getUserData().token;
    return this._Http.delete<string>(`${this._rootURL}/${productID}`, this.authHeader(token));
  }
  addProduct(productID: string,): Observable<IProduct> {
    let token = this._authService.getUserData().token;
    return this._Http.post<IProduct>(`${this._rootURL}`,{product_id: productID}, this.authHeader(token));
  }

}
