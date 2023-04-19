import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  DEFAULT_PAGINATION,
  MAX_INT_VALUE
} from 'src/app/_core/constants/pagination.constant';
import { IPaginationData } from 'src/app/_core/models/pagination.model';
import { IUser, IUserPagination } from 'src/app/_core/models/user.interface';
import { UserService } from 'src/app/_core/services/user.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.scss'],
})
export class RegisteredUsersComponent implements OnInit, OnDestroy {
  public searchUserControl = new FormControl('');
  public isLoading = false;
  public pagination = { ...DEFAULT_PAGINATION };
  public users!: IUserPagination & IPaginationData;
  public usersTemp!: IUserPagination & IPaginationData;
  private _searchSubscription: Subscription = new Subscription();
  private _subscription: Subscription = new Subscription();
  constructor(private _userService: UserService, private _router: Router) {}

  public ngOnInit(): void {
    this._getUsers();
    this._subscribeToSearchUserControlChange();
  }

  public onPageChange(pageNumber: number): void {
    this.pagination.page = pageNumber;
  }

  public showUserProfile(id: number): void {
    this._router.navigate(['/user-profile/' + id]);
  }

  private _subscribeToSearchUserControlChange(): void {
    this._searchSubscription = this.searchUserControl.valueChanges
      .pipe(
        switchMap((value: string) => {
          if (value) {
            this.users.items = this.usersTemp.items.filter((user: IUser) =>
              user.nickName.toLowerCase().includes(value.toLowerCase())
            );
          } else {
            this._resetUsers();
          }
          return of();
        })
      )
      .subscribe(() => {});
  }

  private _getUsers(): void {
    this.isLoading = true;
    this._subscription = this._userService
      .getAllUsers({ page: 1, limit: MAX_INT_VALUE })
      .subscribe((data) => {
        this.users = data;
        this.usersTemp = { ...this.users };
        this.isLoading = false;
      }, err => this.isLoading = false);
    this._resetUsers();
  }

  private _resetUsers(): void {
    this.users = { ...this.usersTemp };
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._searchSubscription.unsubscribe();
  }
}
