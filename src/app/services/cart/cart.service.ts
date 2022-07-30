import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';
import { AuthService } from '../auth/auth.service';
import { IcartItem } from '../../interfaces/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _rootURL = "http://localhost:8000/api/cartProduct";
  cart!: IcartItem[];
  public cartChange: BehaviorSubject<IcartItem[]> = new BehaviorSubject<IcartItem[]>(this.cart);

  constructor(private _Http: HttpClient, private _authService: AuthService) { }
  private authHeader(token: string): { headers: HttpHeaders } {
    let headers_object = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    })
    let options = {
      headers: headers_object
    };
    return options;
  }

  getCartList(): Observable<IcartItem[]> {
    let token = this._authService.getUserData().token;
    return this._Http.get<IcartItem[]>(`${this._rootURL}`, this.authHeader(token));
  }
  updateProductList() {
    this.getCartList().subscribe((cart) => {
      this.cartChange.next(cart);
    });
  }
  deleteProduct(cartItemeID: string): Observable<string> {
    let token = this._authService.getUserData().token;
    return this._Http.delete<string>(`${this._rootURL}/${cartItemeID}`, this.authHeader(token));
  }
  addProduct(productId: string, quantity: string): Observable<IProduct> {
    let cartItem = {
      product: productId, quantity: quantity
    }
    let token = this._authService.getUserData().token;
    return this._Http.post<IProduct>(`${this._rootURL}`, cartItem, this.authHeader(token));
  }
  updateProduct(cart_itemID: string, quantity: string): Observable<IProduct> {

    let token = this._authService.getUserData().token;
    return this._Http.patch<IProduct>(`${this._rootURL}/${cart_itemID}`, { quantity: quantity}, this.authHeader(token));
  }

}

