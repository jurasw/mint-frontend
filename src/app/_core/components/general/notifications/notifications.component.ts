import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { INotificationResponse } from 'src/app/home/models/notification-response.interface';
import { INotification } from 'src/app/home/models/notification.interface';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { groupBy } from 'src/app/_core/functions/groupBy.function';
import { isEmpty } from 'src/app/_core/functions/isEmpty.function';
import { IPaginationData } from 'src/app/_core/models/pagination.model';
import { NotificationService } from 'src/app/_core/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  public notifications: INotification[] = [];
  public groupedNotifications!: { [key: string]: INotification[] };
  public showNotifications = false;
  public paginationLimit = 1000;
  public isLoading = false;
  public paginationData!: IPaginationData;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _notificationService: NotificationService,
    private _dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getNotifications();
    this._subscribeToNewNotifications();
  }

  public readAllNotifications(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label:
          'Czy na pewno chcesz oznaczyć wszystkie powiadomienia jako przeczytane?',
        confirmButtonClass: 'btn-primary',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._subscription = this._notificationService
          .readAll()
          .subscribe(() => {
            this.getNotifications();
          });
      }
    });
  }

  public getNotifications(): void {
    this.isLoading = true;
    this._subscription = this._notificationService
      .getAll({ limit: this.paginationLimit, page: 1 })
      .subscribe((data: INotificationResponse) => {
        this.notifications = data.items;
        this.groupedNotifications = groupBy(
          data.items,
          (item) => item.typeNotification
        );
        this.showNotifications = !isEmpty(this.groupedNotifications);
        this.isLoading = false;
      });
  }

  private _subscribeToNewNotifications(): void {
    this._subscription =
      this._notificationService.receiveNotification$.subscribe(
        (notification: INotification) => {
          if (this.groupedNotifications) {
            this.groupedNotifications[notification.typeNotification].push(
              notification
            );
          }
        }
      );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
