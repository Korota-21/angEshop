import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../../interfaces/product';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _rootURL = "http://localhost:8000/api/product"
  products!: IProduct[];
  public productsChange: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>(this.products);

  constructor(private _authService: AuthService, private _Http: HttpClient) { }
  getProducts(): IProduct[] {
    return this.products;
  }

  private authHeader(token: string): { headers: HttpHeaders } {
    let headers_object = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    })
    let options = {
      headers: headers_object
    };
    return options;
  }

  getProductList(): Observable<IProduct[]> {
    let token = this._authService.getUserData().token;
    return this._Http.get<IProduct[]>(`${this._rootURL}/`, this.authHeader(token));
  }
   updateProductList() {
     this.getProductList().subscribe((product) => {
      this.productsChange.next(product)
    });
  }

  getChat(productID: string): Observable<IProduct> {
    let token = this._authService.getUserData().token;
    return this._Http.get<IProduct>(`${this._rootURL}/${productID}`, this.authHeader(token));
  }
  deleteChat(productID: string): Observable<IProduct> {
    let token = this._authService.getUserData().token;
    return this._Http.delete<IProduct>(`${this._rootURL}/${productID}`, this.authHeader(token));
  }
  createChat(email: string): Observable<IProduct> {
    let body = { email: email };
    let token = this._authService.getUserData().token;
    return this._Http.post<IProduct>(`${this._rootURL}`, body, this.authHeader(token));
  }


}
