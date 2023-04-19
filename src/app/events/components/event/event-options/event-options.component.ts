import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { IMenuItem } from 'src/app/_core/models/menu-item.model';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-options',
  templateUrl: './event-options.component.html',
  styleUrls: ['./event-options.component.scss'],
})
export class EventOptionsComponent implements OnInit, OnDestroy {
  @Input() public eventId!: number;
  @Input() public isPastOrActiveEvent!: boolean;
  @Output() public eventDeleted$: EventEmitter<void> = new EventEmitter();
  public showOptions = false;
  public eventOptions: IMenuItem[] = [];
  private _subscription: Subscription = new Subscription();
  private _dialogSubscription: Subscription = new Subscription();
  constructor(
    private _eventService: EventService,
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.showOptions =
      this._authService.isUserAdmin ||
      (this._authService.isUserSpecialist &&
       this._authService.currentUser ? this.eventId === this._authService.currentUser.id : false);
    this._setPostOptions();
  }

  public onOptionClick(item: IMenuItem): void {
    switch (this.eventOptions[this.eventOptions.indexOf(item)].action) {
      case 'modifyEvent':
        this._modifyEvent();
        break;
      case 'deleteEvent':
        this._deleteEvent();
        break;
    }
  }

  private _setPostOptions(): void {
    const modifyEvent = {
      label: 'Modyfikuj wydarzenie',
      action: 'modifyEvent',
    };
    const deleteEvent = {
      label: 'Usuń wydarzenie',
      action: 'deleteEvent',
    };
    if (!this.isPastOrActiveEvent) {
      this.eventOptions.push(modifyEvent);
    }
    this.eventOptions = [...this.eventOptions, deleteEvent];
  }

  private _deleteEvent(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label: 'Czy na pewno chcesz usunąć wydarzenie?',
      },
    });
    this._dialogSubscription = dialogRef
      .afterClosed()
      .subscribe((state: boolean) => {
        if (state) {
          this._subscription = this._eventService
            .deleteEvent(this.eventId)
            .subscribe(() => {
              this.eventDeleted$.emit();
            });
        }
      });
  }

  private _modifyEvent(): void {
    this._router.navigate(['/events/edit-event/' + this.eventId]);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._dialogSubscription.unsubscribe();
  }
}
