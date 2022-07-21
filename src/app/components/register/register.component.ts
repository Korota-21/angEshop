import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  name!: string;
  email!: string;
  password!: string;
  err = false;
  errMessage = "";
  constructor(private _AuthService: AuthService
    ,private _router: Router) { }

  ngOnInit(): void {
  }

  submitted() {
    if (!this.name || !this.email || !this.password)
     return this.showErrorMessage("All Field are required")

      this._AuthService.register(
        { 'name': this.name, 'email': this.email, 'password': this.password })
        .subscribe(res => { this._AuthService.saveUserData(res.user,res.token)
          this._router.navigate(['./main'])},
        err => this.showErrorMessage(err.error.message)
        )

  }

  showErrorMessage(message:string){
    this.err = true;
    this.errMessage =message;
  }
}
