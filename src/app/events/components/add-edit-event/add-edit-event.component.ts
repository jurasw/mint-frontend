import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { add, addDays, differenceInHours } from 'date-fns';
import { Subscription } from 'rxjs';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { RECURRENCE_OPTIONS } from 'src/app/_core/constants/events.constant';
import { IOption } from 'src/app/_core/models/option.interface';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { DownloadService } from 'src/app/_core/services/download.service';
import { IEvent } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss'],
})
export class AddEditEventComponent implements OnInit, OnDestroy {
  public recurrenceOptions: IOption[] = [...RECURRENCE_OPTIONS];
  public eventThumbnal!: Blob;
  public eventThumbnailUrl!: SafeStyle;
  public event!: IEvent;
  public eventId!: number;
  public isLessThanDayToStartEvent = false;
  public organizers: IUser[] = [];
  public isSending = false;
  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
    recurrence: new FormControl(0),
    startDate: new FormControl({value: '', disabled: this.isLessThanDayToStartEvent}, { validators: [Validators.required] }),
    startTime: new FormControl({value: '', disabled: this.isLessThanDayToStartEvent}, { validators: [Validators.required] }),
    targetGroupId: new FormControl(null),
    endTime: new FormControl({value: '', disabled: this.isLessThanDayToStartEvent}, { validators: [Validators.required] }),
    description: new FormControl('', {
      validators: [Validators.minLength(3), Validators.maxLength(500), Validators.required],
    }),
  });
  private _subscription: Subscription = new Subscription();
  private _downloadImageSubscription: Subscription = new Subscription();
  constructor(
    private _eventService: EventService,
    private _downloadService: DownloadService,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _datePipe: DatePipe,
    private _authService: AuthenticationService,
    private _userProfileService: UserProfileService
  ) {}

  public ngOnInit(): void {
    const url = this._activatedRoute.snapshot.url[1];
    if (url) {
      this.eventId = +url.path;
      this.getEvent();
    } else {
      this.getCurrentUser();
    }
    this._cdr.detectChanges();
  }

  public getEvent(): void {
    this._subscription = this._eventService
      .getEvent(this.eventId)
      .subscribe((event: IEvent) => {
        this.event = event;
        this.isLessThanDayToStartEvent = differenceInHours(new Date(event.startDate), new Date()) <= 24;
        if (this.isLessThanDayToStartEvent) {
          this.form.controls.startDate.disable();
          this.form.controls.startTime.disable();
          this.form.controls.endTime.disable();
        }

        this._setForm();
      });
  }

  public getCurrentUser(): void {
    if (this._authService.currentUser) {
      this.organizers = [];
      this._subscription = this._userProfileService
        .getAllUserData(this._authService.currentUser.id)
        .subscribe((user: IUser) => {
          this.organizers.push(user);
        });
    }
  }

  public onInputFileChange(event: Event): void {
    if (event.target) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.eventThumbnal = files[0];
        this.eventThumbnailUrl = this._downloadService.getSafeUrlFromBlob(
          files[0],
          true
        );
      }
    }
  }

  public onOrganizersChange(data: IUser[]): void {
    this.organizers = data;
  }

  public submit(): void {
    this.isSending = true;
    this._subscription.unsubscribe();
    this._subscription = new Subscription();
    const formData = new FormData();
    const startHour = this.form.controls.startTime.value.split(':');
    const endHour = this.form.controls.endTime.value.split(':');
    const startDate = add(new Date(this.form.controls.startDate.value), {
      hours: startHour[0],
      minutes: startHour[1],
    });
    let endDate = add(new Date(this.form.controls.startDate.value), {
      hours: endHour[0],
      minutes: endHour[1],
    });
    if (JSON.stringify(endHour) === JSON.stringify(['00', '00'])) {
      endDate = addDays(endDate, 1);
    }
    const organizerIds = this.organizers.map((user) => user.id);
    formData.append('Title', this.form.controls.title.value);
    formData.append('Description', this.form.controls.description.value);
    formData.append('Thumbnail', this.eventThumbnal);
    formData.append('UpdateThumbnail', this.event ? 'true' : 'false');
    formData.append(
      'TargetGroupId',
      this.form.controls.targetGroupId.value === null
        ? ''
        : this.form.controls.targetGroupId.value
    );
    formData.append(
      'OrganizerId',
      organizerIds.length > 0 ? organizerIds[0].toString() : '0'
    );
    organizerIds.slice(1).forEach((id) => {
      formData.append('SuborganizerIds', id.toString());
    });
    formData.append('Recurrence', this.form.controls.recurrence.value);
    formData.append('StartDate', startDate.toUTCString());
    formData.append('EndDate', endDate.toUTCString());
    const addEditEvent$ = this.event
      ? this._eventService.editEvent(this.eventId, formData)
      : this._eventService.addEvent(formData);
    this._subscription = addEditEvent$.subscribe(
      () => {
        this._router.navigate(['/events']);
        window.scrollTo({
          top: 0,
        });
        this.isSending = false;
      },
      (err) => {
        window.scrollTo({
          top: 0,
        });
        this.isSending = false;
      }
    );
  }

  private _setForm(): void {
    Object.keys(this.event).forEach((key) => {
      switch (key) {
        case 'thumbnail':
          if (this.event.thumbnail) {
            this._downloadImageSubscription = this._downloadService
            .downloadFileFromUrl(this.event.thumbnail.filePath)
            .subscribe((blob: Blob) => {
              this.eventThumbnal = blob;
              this.eventThumbnailUrl = this._downloadService.getSafeUrlFromBlob(
                blob,
                true
              );
            });
          }

          break;
        case 'organizer':
          this.organizers[0] = this.event.organizer;
          break;
        case 'suborganizers':
          this.organizers.push(...this.event.suborganizers);
          this.organizers = [...this.organizers];
          break;
        case 'startDate':
          const startDate = new Date(this.event.startDate);
          const formStartDate = new Date(
            new Date(startDate).setHours(0, 0, 0, 0)
          );
          const startTime = this._datePipe.transform(
            new Date(startDate),
            'HH:mm'
          );
          this.form.controls.startDate.setValue(formStartDate);
          this.form.controls.startTime.setValue(startTime);
          break;
        case 'endDate':
          const endTime = this._datePipe.transform(
            new Date(this.event.endDate),
            'HH:mm'
          );
          this.form.controls.endTime.setValue(endTime);
          break;
        case 'title':
        case 'description':
        case 'recurrence':
        case 'targetGroupId':
          this.form.controls[key].setValue(this.event[key as keyof IEvent]);
          break;
      }
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._downloadImageSubscription.unsubscribe();
  }
}
