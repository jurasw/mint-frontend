import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { INotification } from 'src/app/home/models/notification.interface';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { RECURRENCE_OPTIONS } from 'src/app/_core/constants/events.constant';
import { groupBy } from 'src/app/_core/functions/groupBy.function';
import { IOption } from 'src/app/_core/models/option.interface';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { DownloadService } from 'src/app/_core/services/download.service';
import { NotificationService } from 'src/app/_core/services/notification.service';
import { IEvent } from '../../models/event.model';
import {
  IOpenviduConnection,
  IOpenviduSession
} from '../../models/openvidu-session.model';
import { EventService } from '../../services/event.service';
import { OpenviduService } from '../../services/openvidu.service';

@Directive()
export class EventLogicDirective implements OnInit, OnDestroy {
  @Input() public set event(event: IEvent) {
    this._event = event;
    this.getActiveSession();
  }
  public get event(): IEvent {
    return this._event;
  }
  @Output() public eventDeleted$: EventEmitter<number> = new EventEmitter();
  public isOwnEvent = false;
  public isEventTimeActive = false;
  public isPastEvent = false;
  public isUserRegistered = false;
  public isUserAdmin = false;
  public checkEventStateInterval!: any;
  public recurrenceOptions!: { [key: number]: IOption[] };
  protected _event!: IEvent;
  protected subscription: Subscription = new Subscription();
  protected userDataSubscription: Subscription = new Subscription();
  protected downloadSubscription: Subscription = new Subscription();
  protected notificationsSubscription: Subscription = new Subscription();
  constructor(
    protected downloadService: DownloadService,
    protected eventService: EventService,
    protected authService: AuthenticationService,
    protected dialog: MatDialog,
    protected userProfileService: UserProfileService,
    protected openviduService: OpenviduService,
    protected router: Router,
    protected notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.setEventStates();
    this.checkEventState();
    this.checkEventStateInterval = setInterval(() => {
      this.checkEventState();
    }, 1000 * 60);
    this.downloadImage();
    this.subscribeToNewNotifications();
    this.recurrenceOptions = groupBy([...RECURRENCE_OPTIONS], (r) => r.value);
  }

  public checkEventState(): void {
    this.isEventTimeActive = this.eventService.isEventActive(this.event);
    this.isPastEvent = this.eventService.isPastEvent(this.event);
  }

  public downloadImage(): void {
    if (this.event.thumbnail && !this.event.thumbnailUrl) {
      this.downloadSubscription = this.downloadService
        .downloadFileFromUrl(this.event.thumbnail.filePath)
        .subscribe((file: Blob) => {
          this.event.thumbnailUrl = this.downloadService.getSafeUrlFromBlob(
            file,
            true
          );
        });
    }
  }

  public onEventClose(): void {
    this.eventService.getEvent(this.event.id).subscribe(event => {
      this.event.isPendingClose = event.isPendingClose;
    });
  }

  public onEventDelete(): void {
    this.eventDeleted$.emit(this.event.id);
  }

  public joinToEvent(): void {
    this.connectToSession();
  }

  public startEvent(): void {
    this.eventService.startEvent(this.event.id).subscribe(() => {
      this.event.isStarted = true;
    });
  }

  public closeEvent(): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        label: 'Czy na pewno chcesz zakończyć to wydarzenie?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventService.closeEvent(this.event.id).subscribe(() => {
          this.onEventClose();
        });
        this.deleteSession();
      }
    });
  }

  public addSession(): void {
    const addSession$ = this.openviduService.addSession({
      customSessionId: this.event.id.toString(),
    });
    this.subscription = addSession$.subscribe((session) => {
      this.event.session = session;
      this.event.isSession = true;
      this.connectToSession();
      this.eventService.startOpenviduSession(this.event.id).subscribe();
    });
  }

  public deleteSession(): void {
    if (this.event.session) {
      this.subscription = this.openviduService
        .deleteSession(+this.event.session.id)
        .subscribe(() => {
          this.event.session = undefined;
          this.event.isSession = false;
          this.eventService.stopOpenviduSession(this.event.id).subscribe();
        });
    }
  }

  public connectToSession(): void {
    const id = this.event.id.toString();
    const connect$: Observable<IOpenviduConnection> =
      this.openviduService.connectToSession(id, {
        role: this.isOwnEvent ? 'PUBLISHER' : 'SUBSCRIBER',
      });
    const connection$: Observable<IOpenviduConnection[]> = this.isOwnEvent
      ? forkJoin([connect$, connect$])
      : forkJoin([connect$]);
    this.subscription = connection$.subscribe(([c1, c2]) => {
      this.router.navigate(['/openvidu-session/' + id], {
        state: {
          data: {
            session: this.event.session,
            c1,
            c2,
            isPublisher: this.isOwnEvent,
            event: this.event,
            enableRecording: true
          },
        },
      });
    });
  }

  public getCurrentUser(): void {
    this.userDataSubscription.unsubscribe();
    this.userDataSubscription = new Subscription();
    if (this.authService.currentUser) {
      this.userDataSubscription = this.userProfileService
      .getAllUserData(this.authService.currentUser.id)
      .subscribe((user: IUser) => {
        this.event.attendees.push(user);
      });
    }
  }

  public registerToEvent(): void {
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
    this.subscription = this.eventService
      .registerToEvent(this.event.id)
      .subscribe(() => {
        this.isUserRegistered = true;
        this.getCurrentUser();
      });
  }

  public unregisterFromEvent(): void {
    this.subscription = this.eventService
      .unregisterFromEvent(this.event.id)
      .subscribe(() => {
        this.isUserRegistered = false;
        this.event.attendees = this.event.attendees.filter(
          (attendee) => this.authService.currentUser && attendee.id !== this.authService.currentUser.id
        );
      });
  }

  public showEventDetails(): void {
    this.router.navigate(['/events/event-details/' + this.event.id]);
  }

  protected subscribeToNewNotifications(): void {
    this.notificationsSubscription =
      this.notificationService.receiveNotification$.subscribe(
        (notification: INotification) => {
          if (
            notification.typeNotification === 'Event' && notification.redirectTo &&
            notification.redirectTo.eventId === this.event.id
          ) {
            if (notification.message.includes('Rozpoczęło się spotkanie video')) {
              if (!this.event.session) {
                this.openviduService
                  .getSession(this.event.id)
                  .subscribe((session: IOpenviduSession) => {
                    this.event.session = session;
                    this.event.isSession = true;
                  });
              }
            }
            if (
              notification.message.includes('Zakończyło się spotkanie video')
            ) {
              this.event.isSession = false;
              this.event.session = undefined;
            }
          }
        }
      );
  }

  protected setEventStates(): void {
    this.isUserAdmin = this.authService.isUserAdmin;
    this.isUserRegistered = !!this.event.attendees.filter(
      (attendee) => this.authService.currentUser &&  attendee.id === this.authService.currentUser.id
    )[0];
    const suborganizer = this.event.suborganizers.filter(
      (sub) => this.authService.currentUser && sub.id === this.authService.currentUser.id
    )[0];
    this.isOwnEvent = this.authService.currentUser &&
      this.authService.currentUser.id === this.event.organizerId ||
      !!suborganizer;
  }

  protected getActiveSession(): void {
    if (this.event.isSession === undefined) {
      this.openviduService
        .getSession(this._event.id)
        .pipe(take(1))
        .subscribe(
          (session: IOpenviduSession) => {
            if (session) {
              this.event.session = session;
            }
            this.event.isSession = !!this.event.session;
          },
          (err) => {
            this.event.isSession = false;
          }
        );
    }
  }

  public ngOnDestroy(): void {
    this.userDataSubscription.unsubscribe();
    this.downloadSubscription.unsubscribe();
    this.subscription.unsubscribe();
    if (this.checkEventStateInterval) {
      clearInterval(this.checkEventStateInterval);
    }
  }
}
