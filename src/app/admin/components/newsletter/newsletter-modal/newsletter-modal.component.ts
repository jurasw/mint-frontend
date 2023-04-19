import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApiAdminService } from 'src/app/admin/services/api-admin.service';

@Component({
  selector: 'app-newsletter-modal',
  templateUrl: './newsletter-modal.component.html',
  styleUrls: ['./newsletter-modal.component.scss']
})
export class NewsletterModalComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<NewsletterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiAdminService: ApiAdminService
  ) { }

  public ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public remove(): void {
    this.subscription = this.apiAdminService.removeNewsletterArticle(this.data.article.id).subscribe();
    this.dialogRef.close();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
