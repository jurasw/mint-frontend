import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IChatUserResponse } from 'src/app/chat/models/chat-user.interface';
import { RoomService } from 'src/app/chat/services/room.service';
import { DEFAULT_PAGINATION } from 'src/app/_core/constants/pagination.constant';
import { IPaginationData } from 'src/app/_core/models/pagination.model';
import { IUser } from 'src/app/_core/models/user.interface';

@Component({
  selector: 'app-organizers',
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.scss'],
})
export class OrganizersComponent implements OnInit, OnDestroy {
  @Output() public organizers$: EventEmitter<IUser[]> = new EventEmitter();
  @Input() public organizers: IUser[] = [];
  public searchUserControl = new FormControl();
  public searchUsers: IUser[] = [];
  public isLoading = false;
  public moreResultsLoading = false;
  public pagination = { ...DEFAULT_PAGINATION };
  public paginationData!: IPaginationData;
  private _subscription: Subscription = new Subscription();
  private _searchSubscription: Subscription = new Subscription();
  constructor(private _roomService: RoomService) {}

  public ngOnInit(): void {
    this._searchUserChange();
  }

  public onScrollBottom(): void {
    if (
      this.paginationData.totalPages !== this.pagination.page &&
      !this.isLoading
    ) {
      this.pagination.page++;
      this._searchUsers(false, true);
    }
  }

  public onResultClick(user: IUser): void {
    if (!this.organizers.filter(u => u.id === user.id)[0]) {
      this.searchUserControl.setValue('');
      this.searchUsers = [];
      this.organizers.push(user);
      this.organizers = [...this.organizers];
      this.organizers$.emit(this.organizers);
    }
  }

  public deleteOrganizer(userId: number): void {
    this.organizers = [...this.organizers.filter((user: IUser) => user.id !== userId)];
    this.organizers$.emit(this.organizers);
  }

  private _searchUsers(loading = true, moreResults = false): void {
    this._searchSubscription.unsubscribe();
    this._searchSubscription = new Subscription();

    if (loading) {
      this.isLoading = true;
    }
    if (moreResults) {
      this.moreResultsLoading = true;
    }
    this._searchSubscription = this._roomService
      .searchUsers(this.searchUserControl.value, this.pagination)
      .subscribe((users: IChatUserResponse & IPaginationData) => {
        this.isLoading = false;
        if (users && users.items) {
          if (moreResults) {
            this.searchUsers.push(...users.items);
            this.searchUsers = [...this.searchUsers];
          } else {
            this.searchUsers = users.items;
          }
          this.moreResultsLoading = false;
          this.paginationData = users;
        } else {
          this.searchUsers = [];
        }
      });
  }

  private _searchUserChange(): void {
    this._subscription = this.searchUserControl.valueChanges.subscribe(
      (value) => {
        this.searchUsers = [];
        if (value) {
          this.pagination.page = 1;
          this._searchUsers();
        }
      },
      (err) => {
        this.isLoading = false;
        this.moreResultsLoading = false;
      }
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
