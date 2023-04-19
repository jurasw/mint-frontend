import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { IWarn } from 'src/app/user-profile/models/warns.model';
import { UserService } from 'src/app/_core/services/user.service';

@Component({
  selector: 'app-history-of-warnings-modal',
  templateUrl: './history-of-warnings-modal.component.html',
  styleUrls: ['./history-of-warnings-modal.component.scss'],
})
export class HistoryOfWarningsModalComponent implements OnInit {
  public isWarnLoading = false;
  public warns: IWarn[] = [];
  private _warnsSubscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HistoryOfWarningsModalComponent>,
    public dialog: MatDialog,
    private _userService: UserService
  ) {}

  public ngOnInit(): void {
    this.getListOfWarns();
  }

  public getListOfWarns(): void {
    this._warnsSubscription.unsubscribe();
    this.isWarnLoading = true;
    this.warns = [];
    this._warnsSubscription = this._userService
      .getUserWarning(this.data.userId)
      .subscribe(
        (data) => {
          this.warns = data;
          this.isWarnLoading = false;
        },
        (err) => {
          this.isWarnLoading = false;
        }
      );
  }

  public close(state: boolean): void {
    this.dialogRef.close(state);
  }

  public closeDialog(state: boolean): void {
    this.dialogRef.close(state);
  }

  public ngOnDestroy(): void {
    this._warnsSubscription.unsubscribe();
  }
}
