import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/_core/services/user.service';

@Component({
  selector: 'app-user-warn-modal',
  templateUrl: './user-warn-modal.component.html',
  styleUrls: ['./user-warn-modal.component.scss'],
})
export class UserWarnModalComponent implements OnInit {
  public isSending = false;
  public form = new FormGroup({
    warningMessage: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
    }),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<UserWarnModalComponent>,
    private _userService: UserService
  ) {}

  public ngOnInit(): void {}

  public send(): void {
    this.isSending = true;
    this._userService
      .warnUser(this.data.userId, this.form.controls.warningMessage.value)
      .subscribe(
        () => {
          this.isSending = false;
          this._dialogRef.close();
        },
        (err) => {
          this.isSending = false;
        }
      );
  }
}
