import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../interfaces/user';
import { Observable } from 'rxjs';
import * as AppUtil from "../../common/app.util"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _rootURL = "http://localhost:8000/api/auth"
  constructor(
    private _Http: HttpClient
  ) { }

  login(userData: { email: string, password: string }): Observable<{ user: IUser, token: string }> {
    return this._Http.post<{ user: IUser, token: string }>(`${this._rootURL}/login`, userData);

  }
  register(userData: { name: string, email: string, password: string }): Observable<{ user: IUser, token: string }> {
    return this._Http.post<{ user: IUser, token: string }>(`${this._rootURL}/register`, userData);

  }
  authUser(): Observable<IUser> {
    return this._Http.get<IUser>(`${this._rootURL}/me`, this.authHeader(this.getUserData().token));

  }

  saveUserData(user: IUser, token: string) {
    localStorage.setItem(AppUtil.AUTH_TOKEN, token);
    localStorage.setItem(AppUtil.USER_INFO, JSON.stringify(user));
  }
  logout() {
    localStorage.removeItem(AppUtil.AUTH_TOKEN);
    localStorage.removeItem(AppUtil.USER_INFO);
  }
  isUserLoggedIn(): boolean {
    //TODO: Enhance this methid with jwt
    return !!localStorage.getItem(AppUtil.AUTH_TOKEN);
  }
  // isAdmin(): Observable<boolean> {
  //   this._Http.get<IUser>(`${this._rootURL}/me`, this.authHeader(this.getUserData().token)).subscribe(res => {
  //     console.log(res);

  //     if (res['type'] == 'admin')
  //       return true;
  //     return false;
  //   })


  // };
  getUserData(): { user: IUser, token: string } {
    let user: IUser = JSON.parse(localStorage.getItem(AppUtil.USER_INFO)!);
    let token: string = localStorage.getItem(AppUtil.AUTH_TOKEN)!;
    return { user: user, token: token };
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

}
