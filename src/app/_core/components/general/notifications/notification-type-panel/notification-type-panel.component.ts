import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { INotification } from 'src/app/home/models/notification.interface';
import { NotificationsModalComponent } from '../notifications-modal/notifications-modal.component';

@Component({
  selector: 'app-notification-type-panel',
  templateUrl: './notification-type-panel.component.html',
  styleUrls: ['./notification-type-panel.component.scss']
})
export class NotificationTypePanelComponent implements OnInit {
  @Input() public type!: string;
  @Input() public notifications: INotification[] = [];
  @Output() public refresh$: EventEmitter<void> = new EventEmitter();
  public unreadNotifications = 0;
  public translatedType!: string;
  constructor(private _dialog: MatDialog) { }

  public ngOnInit(): void {
    this.unreadNotifications = this.notifications.filter(n => !n.isRead).length;
    this._translateNotificationType();
  }

  public showNotifications(): void {
    const dialogRef = this._dialog.open(NotificationsModalComponent, {
      data: {
        notifications: this.notifications,
        type: this.translatedType
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh$.emit();
    });
  }

  private _translateNotificationType(): void {
    switch (this.type) {
      case 'Chat':
        this.translatedType = 'Wiadomości';
        break;
      case 'Article':
        this.translatedType = 'Czytelnia';
        break;
      case 'Forum':
        this.translatedType = 'Forum';
        break;
      case 'Event':
        this.translatedType = 'Wydarzenia';
        break;
      default:
        this.translatedType = '';
        break;
    }
  }
}
