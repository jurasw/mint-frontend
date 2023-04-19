import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IEvent } from 'src/app/events/models/event.model';

@Component({
  selector: 'app-event-details-modal',
  templateUrl: './event-details-modal.component.html',
  styleUrls: ['./event-details-modal.component.scss'],
})
export class EventDetailsModalComponent implements OnInit, OnDestroy {
  private _routerSubscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { event: IEvent },
    private _router: Router,
    private _dialogRef: MatDialogRef<EventDetailsModalComponent>
  ) {}

  public ngOnInit(): void {
    this._subscribeToRouteChange();
  }

  private _subscribeToRouteChange(): void {
    this._routerSubscription = this._router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        filter(() => !!this._dialogRef)
      )
      .subscribe(() => {
        this._dialogRef.close();
      });
  }

  public ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }
}
