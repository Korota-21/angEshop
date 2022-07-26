import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tab = "dashboard";
  name = ""
  constructor(public _authService: AuthService, private _router: Router,) { }

  ngOnInit(): void {
    this.name = this._authService.getUserData().user.name
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
