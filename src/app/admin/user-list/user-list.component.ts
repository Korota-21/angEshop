import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
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
  subscribtion!: Subscription;
  ngOnInit(): void {
    this.getUsers();
    this.subscribtion = this._authService.usersChange.subscribe((users:IUser[]) => {
      this.users = users;
    })
  }
  getUsers() {
    this._authService.getUserList().subscribe(
      (users) => {
        this.users = users;
      }
    );
  }
  deleteProduct(userId: string) {
    if (confirm('Are you sure you want to delete this user?'))
      this._authService.deleteUser(userId).subscribe(
        () => {
          this._authService.updateUsersList();

        }
      );
  }
}
