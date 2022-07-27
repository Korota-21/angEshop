import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = this._authService.isUserLoggedIn();
  constructor(public _authService: AuthService, private _router: Router) {
    this.loggedIn = this._authService.isUserLoggedIn();
  }

  ngOnInit(): void {
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
