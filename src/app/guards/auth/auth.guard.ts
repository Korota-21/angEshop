import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let ret = false;
    return this._authService.authUser().pipe(
      map(response => {
          return true;
      }),
      catchError(error => {
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
        return of(false)
      })

    )
    // return true;
  }

}
