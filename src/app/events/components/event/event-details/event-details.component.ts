import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IEvent } from 'src/app/events/models/event.model';
import { EventService } from 'src/app/events/services/event.service';
import { OpenviduService } from 'src/app/events/services/openvidu.service';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { DownloadService } from 'src/app/_core/services/download.service';
import { NotificationService } from 'src/app/_core/services/notification.service';
import { EventLogicDirective } from '../event.logic';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent extends EventLogicDirective implements OnInit {
  @Input() public showBackButton = true;
  constructor(
    private _downloadService: DownloadService,
    private _eventService: EventService,
    private _authService: AuthenticationService,
    private _dialog: MatDialog,
    private _userProfileService: UserProfileService,
    private _openviduService: OpenviduService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _notificationService: NotificationService
  ) {
    super(_downloadService, _eventService, _authService, _dialog, _userProfileService, _openviduService, _router, _notificationService);
  }
  public ngOnInit(): void {
    if (!this.event) {
      (this._route.data as Observable<IEvent[]>).subscribe((events: IEvent[]) => {
        this.event = events[0];
        super.ngOnInit();
      });
    } else {
      super.ngOnInit();
    }

  }

}
