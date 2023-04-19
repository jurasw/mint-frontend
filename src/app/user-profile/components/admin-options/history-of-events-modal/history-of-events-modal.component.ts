import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IEvent } from 'src/app/events/models/event.model';
import { EventService } from 'src/app/events/services/event.service';

@Component({
  selector: 'app-history-of-events-modal',
  templateUrl: './history-of-events-modal.component.html',
  styleUrls: ['./history-of-events-modal.component.scss'],
})
export class HistoryOfEventsModalComponent implements OnInit {
  public isDataLoading = false;
  public events: IEvent[] = [];
  public fromDate: string = new Date(
    new Date().setHours(0, 0, 0, 0)
  ).toUTCString();
  public isLoading = false;
  private _subscription: Subscription = new Subscription();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HistoryOfEventsModalComponent>,
    public dialog: MatDialog,
    private _eventService: EventService
  ) {}

  public ngOnInit(): void {
    this._getEvents();
  }

  public close(state: boolean): void {
    this.dialogRef.close(state);
  }

  public closeDialog(state: boolean): void {
    this.dialogRef.close(state);
  }

  private _getEvents(): void {
    this.isLoading = true;

    this._subscription = this._eventService
      .getEvents(this.fromDate)
      .subscribe((data) => {
        this.events = data.filter(
          (item: any) =>
            item.attendees.filter((res: any) => res.id === this.data.userId)
              .length > 0
        );
        this.isLoading = false;
      });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
