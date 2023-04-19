import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from '../../../services/error.service';

type AlertType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent implements OnInit, OnDestroy {
  @Input() public type: AlertType = 'danger';
  @Input() public message: string | string[] | undefined;
  private _subscription: Subscription = new Subscription();
  constructor(private _errorService: ErrorService) {}

  public ngOnInit(): void {
    if (this.type === 'danger' || this.type === 'warning') {
      this._errorService.currentError$.subscribe((msg) => {
        this.message = msg;
        if (Array.isArray(this.message)) {
          this.message = this.message.flat().join('\n');
        }
      });
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
