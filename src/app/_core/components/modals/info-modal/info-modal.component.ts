import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { label: string; confirmButtonClass?: string },
    private _dialogRef: MatDialogRef<InfoModalComponent>
  ) {
    if (!this.data.confirmButtonClass) {
      this.data.confirmButtonClass = 'btn-primary';
    }
  }

  public ngOnInit(): void {}

  public confirm(): void {
    this._dialogRef.close(true);
  }
}
