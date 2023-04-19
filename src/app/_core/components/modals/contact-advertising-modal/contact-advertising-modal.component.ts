import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-advertising-modal',
  templateUrl: './contact-advertising-modal.component.html',
  styleUrls: ['./contact-advertising-modal.component.scss'],
})
export class ContactAdvertisingModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ContactAdvertisingModalComponent>
  ) {}

  public ngOnInit(): void {}

  public close(state: boolean): void {
    this.dialogRef.close(state);
  }
}
