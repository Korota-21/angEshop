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
  public colorsList = ['red', 'blue', 'black', 'yellow'];
  public tagsList = ["top", "bottom", "children", "men", "women"];
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

  getProductList(pagination?: number, page?: number, availability?: boolean, colors?: string[], tags?: string[]): Observable<{products:IProduct[],count:number}> {
    let token = this._authService.getUserData().token;
    let queryString = (pagination ? `pagination=${pagination}&` : '')
      + (page ? `page=${page}&` : '')
      + ((availability != undefined)  ? `availability=${availability}&` : '')
      + (tags ? `tags=${tags}&` : '') +
      (colors ? `colors=${colors}&` : '')
    return this._Http.get<{products:IProduct[],count:number}>(`${this._rootURL}?${queryString}`, this.authHeader(token));
  }
  updateProductList() {
    this.getProductList().subscribe((res) => {
      this.productsChange.next(res.products);
    });
  }

  getProduct(productID: string): Observable<IProduct> {
    let token = this._authService.getUserData().token;
    return this._Http.get<IProduct>(`${this._rootURL}/${productID}`, this.authHeader(token));
  }
  updateProduct(product: IProduct): Observable<IProduct> {
    let token = this._authService.getUserData().token;
    return this._Http.patch<IProduct>(`${this._rootURL}/${product._id}`, product, this.authHeader(token));
  }
  deleteProduct(productID: string): Observable<IProduct> {
    let token = this._authService.getUserData().token;
    return this._Http.delete<IProduct>(`${this._rootURL}/${productID}`, this.authHeader(token));
  }
  createProduct(product: IProduct, image: File): Observable<IProduct> {
    // let body = { email: email };
    const formData = new FormData();
    console.log(product);
    formData.append("image", image);
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity.toString());

    for (var i = 0; i < product.colors.length; i++) {
      formData.append('colors', product.colors[i]);
    }
    for (var i = 0; i < product.tags.length; i++) {
      formData.append('tags', product.tags[i]);
    }
    formData.append("availability", product.availability.toString());

    let token = this._authService.getUserData().token;
    return this._Http.post<IProduct>(`${this._rootURL}`, formData, this.authHeader(token));
  }


}

