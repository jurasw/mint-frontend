import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { DEFAULT_PAGINATION } from 'src/app/_core/constants/pagination.constant';
import { IPaginationData } from 'src/app/_core/models/pagination.model';
import { IUser } from 'src/app/_core/models/user.interface';
import { IChatUserResponse } from '../../models/chat-user.interface';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-chat-search',
  templateUrl: './chat-search.component.html',
  styleUrls: ['./chat-search.component.scss'],
})
export class ChatSearchComponent implements OnInit, OnDestroy {
  @ViewChild('results') public resultsElement!: ElementRef;
  @Output() public createChatConfirmed$: EventEmitter<IUser> =
    new EventEmitter();
  public searchControl = new FormControl('');
  public pagination = { ...DEFAULT_PAGINATION };
  public paginationData!: IPaginationData;
  public chatUsers: IUser[] = [];
  public isLoading = false;
  public moreResultsLoading = false;
  private _formControlSubscription = new Subscription();
  private _searchSubscription = new Subscription();
  constructor(private _roomService: RoomService, private _dialog: MatDialog) {}

  public ngOnInit(): void {
    this._onSearchValueChange();
  }

  public onScrollBottom(): void {
    if (
      this.paginationData.totalPages !== this.pagination.page &&
      !this.moreResultsLoading
    ) {
      this.pagination.page++;
      this._search(true);
    }
  }

  public onSearchResultClick(user: IUser): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy chcesz utworzyć czat z użytkownikiem ' + user.nickName + '?',
        confirmButtonClass: 'btn-primary',
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.createChatConfirmed$.next(user);
      }
    });
  }

  private _onSearchValueChange(): void {
    this._formControlSubscription = this.searchControl.valueChanges.subscribe(
      (value) => {
        this.pagination = { ...DEFAULT_PAGINATION };
        if (value && value.length > 0) {
          this._search();
        } else {
          this.chatUsers = [];
        }
      }
    );
  }

  private _search(moreResults = false): void {
    if (moreResults) {
      this.moreResultsLoading = true;
    } else {
      this.isLoading = true;
    }

    this._searchSubscription.unsubscribe();
    this._searchSubscription = this._roomService
      .searchUsers(this.searchControl.value, this.pagination)
      .subscribe(
        (data: IChatUserResponse & IPaginationData) => {
          if (moreResults) {
            this.chatUsers.push(...data.items);
            this.chatUsers = [...this.chatUsers];
            this.moreResultsLoading = false;
          } else {
            this.chatUsers = [...data.items];
            this.isLoading = false;
          }
          this.paginationData = data;
        },
        (err) => {
          this.isLoading = false;
          this.moreResultsLoading = false;
        }
      );
  }

  public ngOnDestroy(): void {
    this._searchSubscription.unsubscribe();
    this._formControlSubscription.unsubscribe();
  }
}
