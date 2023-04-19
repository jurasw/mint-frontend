import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModeratorService } from 'src/app/forum/services/moderator.service';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-moderator-request-modal',
  templateUrl: './moderator-request-modal.component.html',
  styleUrls: ['./moderator-request-modal.component.scss'],
})
export class ModeratorRequestModalComponent implements OnInit {
  public isError = false;
  public form = new FormGroup({
    acceptRegulations: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
    }),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _moderatorService: ModeratorService,
    private _authenticationService: AuthenticationService,
    private _dialogRef: MatDialogRef<ModeratorRequestModalComponent>
  ) {}

  public ngOnInit(): void {}

  public clickItem(item: string): void {
    window.open(item);
  }

  public send(): void {
    this._moderatorService
      .becomeModerator(this.data.forumId, this.form.controls.description.value)
      .subscribe(
        () => {
          this._dialogRef.close(true);
          this.isError = false;
        },
        (err) => {
          if (err.status === 403) {
            this.isError = true;
          }
        }
      );
  }
}
