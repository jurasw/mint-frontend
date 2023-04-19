import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { IArticle } from '../../models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent
  implements OnInit {
  @Input() public article!: IArticle;
  @Output() public articleDeleted$: EventEmitter<number> = new EventEmitter();
  public ownArticle!: boolean;
  public firstArticle!: boolean;
  public format!: string;
  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) { }

  public ngOnInit(): void {
    if (this.article.thumbnail !== null) {
      this.article.thumbnail.type.includes("image") ? this.format = "image" : this.format = "video";
    }
    this.ownArticle = this._authService.currentUser ?
      +this._authService.currentUser.id === +this.article.user.id : false;
  }

  public showArticleDetails(): void {
    this._router.navigate([`/make-dreams/article-details/${this.article.id}`]);
  }

  public onArticleDelete(): void {
    this.articleDeleted$.emit(this.article.id);
  }
}
