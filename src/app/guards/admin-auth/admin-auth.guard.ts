import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let ret = false;
    return this._authService.authUser().pipe(
      map(response => {
        if (response.type === 'admin')
          return true;
        this._router.navigate(['/admin-login'], { queryParams: { returnUrl: state.url } })
        return false
      }),
      catchError(error => {
        this._router.navigate(['/admin-login'], { queryParams: { returnUrl: state.url } })
        return of(false)
      })

    )
  }

}
