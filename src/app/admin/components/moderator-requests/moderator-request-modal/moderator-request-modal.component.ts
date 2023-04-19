import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApiAdminService } from 'src/app/admin/services/api-admin.service';

@Component({
  selector: 'app-moderator-request-modal',
  templateUrl: './moderator-request-modal.component.html',
  styleUrls: ['./moderator-request-modal.component.scss']
})
export class ModeratorRequestModalComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<ModeratorRequestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiAdminService: ApiAdminService
  ) {}
  
  public ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public reject(): void {
    this.subscription = this.apiAdminService.rejectOrAcceptModeratorRequest(this.data.forumId , this.data.request.id, 'reject').subscribe();
    this.dialogRef.close();
  }

  public accept(): void {
    this.subscription = this.apiAdminService.rejectOrAcceptModeratorRequest(this.data.forumId , this.data.request.id, 'accept').subscribe();
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
