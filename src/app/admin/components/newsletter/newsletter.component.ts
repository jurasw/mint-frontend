import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IArticle, IArticleResponse } from 'src/app/articles/models/article.model';
import { ApiAdminService } from '../../services/api-admin.service';
import { NewsletterModalComponent } from './newsletter-modal/newsletter-modal.component';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit, OnDestroy {

  public articles$: Observable<IArticleResponse> = new Observable<IArticleResponse>();
  public isLoading: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private _dialog: MatDialog, private adminService: ApiAdminService) { }

  public ngOnInit(): void {
    this.isLoading = true;
    this.articles$ = this.adminService.getNewsletterArticles().pipe(
      tap(() => this.isLoading = false)
    );
  }

  public sendNewsletter(): void {
    this.subscription = this.adminService.sendNewsletter().subscribe(() => console.log('Wysyłam newsletter'));
  }

  public openDialog(article: IArticle) {
    this._dialog.open(NewsletterModalComponent, {
      data: {
        article
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
