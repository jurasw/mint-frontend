import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from 'src/app/events/models/event.model';

@Component({
  selector: 'app-event-actions',
  templateUrl: './event-actions.component.html',
  styleUrls: ['./event-actions.component.scss']
})
export class EventActionsComponent {
  @Input() public event!: IEvent;
  @Input() public isOwnEvent!: boolean;
  @Input() public isPastEvent!: boolean;
  @Input() public isUserAdmin!: boolean;
  @Input() public isUserRegistered!: boolean;
  @Input() public isEventTimeActive!: boolean;
  @Input() public showDetailsAction = true;
  @Input() public eventStateAlignment: 'left' | 'center' | 'right' = 'center';
  @Output() public startEvent$: EventEmitter<void> = new EventEmitter();
  @Output() public closeEvent$: EventEmitter<void> = new EventEmitter();
  @Output() public joinToEvent$: EventEmitter<void> = new EventEmitter();
  @Output() public addSession$: EventEmitter<void> = new EventEmitter();
  @Output() public registerToEvent$: EventEmitter<void> = new EventEmitter();
  @Output() public unregisterFromEvent$: EventEmitter<void> = new EventEmitter();
  @Output() public showEventDetails$: EventEmitter<void> = new EventEmitter();
  constructor() { }

  public startEvent(): void {
    this.startEvent$.emit();
  }

  public closeEvent(): void {
    this.closeEvent$.emit();
  }

  public joinToEvent(): void {
    this.joinToEvent$.emit();
  }

  public addSession(): void {
    this.addSession$.emit();
  }

  public registerToEvent(): void {
    this.registerToEvent$.emit();
  }

  public unregisterFromEvent(): void {
    this.unregisterFromEvent$.emit();
  }

  public showEventDetails(): void {
    this.showEventDetails$.emit();
  }
}
