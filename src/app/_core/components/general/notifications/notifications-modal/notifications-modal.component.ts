import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatStoreService } from 'src/app/chat/services/chat-store.service';
import { INotification } from 'src/app/home/models/notification.interface';
import { NotificationService } from 'src/app/_core/services/notification.service';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  styleUrls: ['./notifications-modal.component.scss'],
})
export class NotificationsModalComponent implements OnInit, OnDestroy {
  public paginatedNotifications: INotification[] = [];
  public redirection = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { type: string; notifications: INotification[] },
    private _dialogRef: MatDialogRef<NotificationsModalComponent>,
    private _notificationService: NotificationService,
    private _chatStoreService: ChatStoreService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    if (this.data.notifications.length <= 10) {
      this.paginatedNotifications = this.data.notifications;
    } else {
      this.paginatedNotifications = this.data.notifications.slice(0, 10);
    }
  }

  @HostListener('window.scroll', ['$event'])
  public onScrollBottom(event: any): void {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      if (this.paginatedNotifications.length < this.data.notifications.length) {
        this.paginatedNotifications = this.data.notifications.slice(
          0,
          this.paginatedNotifications.length + 10
        );
      }
    }
  }

  public readNotification(notification: INotification): void {
    if (!notification.isRead) {
      this._notificationService.read(notification.id).subscribe(() => {
        notification.isRead = true;
      });
    }
  }

  public myProfileNavigate(notification: INotification): void {
    this.readNotification(notification);
    this._router.navigateByUrl('/user-profile');
    this._dialogRef.close();
    this.redirection = true;
  }

  public navigateTo(notification: INotification): void {
    this.readNotification(notification);
    let url = '';
    const redirectTo = notification.redirectTo;
    if (redirectTo) {
      if (redirectTo.articleId) {
        url = '/make-dreams/article-details/' + redirectTo.articleId;
      } else if (redirectTo.forumId && redirectTo.threadId) {
        url = '/forums/' + redirectTo.forumId + '/' + redirectTo.threadId;
      } else if (redirectTo.eventId) {
        url = '/events/event-details/' + redirectTo.eventId;
      } else if (redirectTo.chatId) {
        const room = this._chatStoreService.chatRooms.filter(
          (r) => r.id === redirectTo.chatId
        )[0];
        if (room) {
          this._chatStoreService.currentChatRoom = room;
          url = '/messages';
        }
      }
      this.readNotification(notification);
      this._router.navigateByUrl(url);
      this._dialogRef.close();
      this.redirection = true;
    }
  }

  public ngOnDestroy(): void {
    if (this.redirection) {
      window.scrollTo(0, 0);
    }
  }
}
