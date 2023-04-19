import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { label: string; confirmButtonClass?: string },
    private _dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {
    if (!this.data.confirmButtonClass) {
      this.data.confirmButtonClass = 'btn-danger';
    }
  }

  public ngOnInit(): void {}

  public confirm(): void {
    this._dialogRef.close(true);
  }
}
