import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private _authService: AuthService) { }
  searchUser!: string;
  users!: IUser[]

  ngOnInit(): void {
    this.getUsers();

  }
  getUsers() {
    this._authService.getUserList().subscribe(
      (users) => {
        this.users = users;
      }
    );
  }
}
