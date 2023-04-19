import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/articles/services/article.service';
import { ConfirmationModalComponent } from 'src/app/_core/components/modals/confirmation-modal/confirmation-modal.component';
import { IMenuItem } from 'src/app/_core/models/menu-item.model';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-article-options',
  templateUrl: './article-options.component.html',
  styleUrls: ['./article-options.component.scss']
})
export class ArticleOptionsComponent implements OnInit, OnDestroy {
  @Input() public articleId!: number;
  @Output() public articleDeleted$: EventEmitter<void> = new EventEmitter();
  public showOptions = false;
  public articleOptions: IMenuItem[] = [];
  private _subscription: Subscription = new Subscription();
  private _dialogSubscription: Subscription = new Subscription();
  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.showOptions =
      this._authService.isUserAdmin ||
      (this._authService.isUserSpecialist &&
        this._authService.currentUser ? this.articleId === this._authService.currentUser.id : false);
    this._setPostOptions();
  }

  public onOptionClick(item: IMenuItem): void {
    switch (this.articleOptions[this.articleOptions.indexOf(item)].action) {
      case 'modifyArticle':
        this._modifyArticle();
        break;
      case 'deleteArticle':
        this._deleteArticle();
        break;
    }
  }

  private _setPostOptions(): void {
    const modifyEvent = {
      label: 'Modyfikuj artykuł',
      action: 'modifyArticle',
    };
    const deleteEvent = {
      label: 'Usuń artykuł',
      action: 'deleteArticle',
    };
    this.articleOptions = [modifyEvent, deleteEvent];
  }

  private _deleteArticle(): void {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: {
        label: 'Czy na pewno chcesz usunąć ten artykuł?',
      },
    });
    this._dialogSubscription = dialogRef
      .afterClosed()
      .subscribe((state: boolean) => {
        if (state) {
          this._subscription = this._articleService
            .deleteArticle(this.articleId)
            .subscribe(() => {
              this.articleDeleted$.emit();
            });
        }
      });
  }

  private _modifyArticle(): void {
    this._router.navigate(['/make-dreams/edit-article/' + this.articleId]);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._dialogSubscription.unsubscribe();
  }
}
