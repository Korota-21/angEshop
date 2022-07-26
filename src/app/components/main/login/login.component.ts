import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!:string
  password!:string
  err = false;
  errMessage = "";

  constructor(private _userService: AuthService,private _router: Router) {

   }

  ngOnInit(): void {
  }

  submitted() {
    if ( !this.email || !this.password)
     return this.showErrorMessage("All Field are required")

     this._userService.login(
      { 'email': this.email, "password": this.password })
      .subscribe(
        res=>{
          this._userService.saveUserData(res.user,res.token)
          this._router.navigate(['./'])
        },
      (err) => {
        this.showErrorMessage(err.error.message)},
      ()=>{

      }
      )
  }

  showErrorMessage(message:string){
    this.err = true;
    this.errMessage =message;
  }
}
