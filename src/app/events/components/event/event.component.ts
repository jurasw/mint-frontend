import {
  Component, OnDestroy,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { DownloadService } from 'src/app/_core/services/download.service';
import { NotificationService } from 'src/app/_core/services/notification.service';
import { EventService } from '../../services/event.service';
import { OpenviduService } from '../../services/openvidu.service';
import { EventLogicDirective } from './event.logic';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent extends EventLogicDirective implements OnInit, OnDestroy {
  constructor(
    private _downloadService: DownloadService,
    private _eventService: EventService,
    private _authService: AuthenticationService,
    private _dialog: MatDialog,
    private _userProfileService: UserProfileService,
    private _openviduService: OpenviduService,
    private _router: Router,
    private _notificationService: NotificationService
  ) {
    super(_downloadService, _eventService, _authService, _dialog, _userProfileService, _openviduService, _router, _notificationService);
  }
}
