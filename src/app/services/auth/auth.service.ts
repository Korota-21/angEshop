import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import * as AppUtil from "../../common/app.util"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _rootURL = AppUtil.API_LINK+"auth"
  constructor(
    private _Http: HttpClient
  ) { }
  users!: IUser[];
  public usersChange: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>(this.users);
  login(userData: { email: string, password: string }): Observable<{ user: IUser, token: string }> {
    return this._Http.post<{ user: IUser, token: string }>(`${this._rootURL}/login`, userData);
  }
  register(userData: { name: string, email: string, password: string }): Observable<{ user: IUser, token: string }> {
    return this._Http.post<{ user: IUser, token: string }>(`${this._rootURL}/register`, userData);

  }
  updateUsersList() {
    this.getUserList().subscribe((users) => {
      this.usersChange.next(users)
    });
  }
  authUser(): Observable<IUser> {
    return this._Http.get<IUser>(`${this._rootURL}/me`, this.authHeader(this.getUserData().token));
  }
  isUserLoggedIn(): boolean {
    //TODO: Enhance this methid with jwt
    return !!localStorage.getItem(AppUtil.AUTH_TOKEN);
  }
  getUserList(): Observable<IUser[]> {
    return this._Http.get<IUser[]>(`${this._rootURL}`, this.authHeader(this.getUserData().token));

  }
  saveUserData(user: IUser, token: string) {
    localStorage.setItem(AppUtil.AUTH_TOKEN, token);
    localStorage.setItem(AppUtil.USER_INFO, JSON.stringify(user));
  }
  logout() {
    localStorage.removeItem(AppUtil.AUTH_TOKEN);
    localStorage.removeItem(AppUtil.USER_INFO);
  }


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
  deleteUser(userId:string):Observable<string> {
    let token = this.getUserData().token;
    return this._Http.delete<string>(`${this._rootURL}/${userId}`, this.authHeader(token));
  }
}
