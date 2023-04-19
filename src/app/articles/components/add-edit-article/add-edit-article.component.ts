import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { QuillConfiguration } from '../../../_core/components/utilities/quill-editor/quill-configuration';
import { DownloadService } from 'src/app/_core/services/download.service';
import { IArticle } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-add-edit-article',
  templateUrl: './add-edit-article.component.html',
  styleUrls: ['./add-edit-article.component.scss'],
})
export class AddEditArticleComponent implements OnInit, OnDestroy {
  @ViewChild('emoticonButton') public emoticonButtonElement!: ElementRef;
  public articleId!: number;
  public article!: IArticle;
  public articleThumbnal!: Blob;
  public articleThumbnailUrl!: SafeStyle;
  public isSending = false;
  public isLoading: boolean = false;
  public showEmoticons = false;
  public thumbnailUrl!: any;
  public format!: string;
  public form: FormGroup = new FormGroup({
    imageDescription: new FormControl('', [Validators.maxLength(200)]),
    title: new FormControl('', [Validators.minLength(3), Validators.maxLength(64), Validators.required]),
    body: new FormControl('', { validators: [Validators.maxLength(50000), Validators.required] }),
  });
  private _subscription: Subscription = new Subscription();
  quillConfiguration = QuillConfiguration;
  constructor(
    private _articleService: ArticleService,
    private _downloadService: DownloadService,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    const url = this._activatedRoute.snapshot.url[1];
    if (url) {
      this.articleId = +url.path;
      this._getArticle();
    }
  }

  public onInputFileChange(event: Event): void {
    if (event.target) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.articleThumbnal = files[0];
        this.articleThumbnailUrl = this._downloadService.getSafeUrlFromBlob(
          files[0],
          true
        );
        this.fileReader(event);
      }
    }
  }

  public fileReader(event: Event): void {
    const file = (event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files![0]
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.thumbnailUrl = (<FileReader>event.target).result;
      }
    }
  }

  public submit(): void {
    this.isSending = true;
    this.isLoading = true;
    window.scrollTo({
      top: 750,
    });
    this._subscription.unsubscribe();
    this._subscription = new Subscription();
    const formData = new FormData();
    formData.append('ImageDescription', this.form.controls.imageDescription.value);
    formData.append('Title', this.form.controls.title.value);
    formData.append('Body', this.form.controls.body.value);
    formData.append('Thumbnail', this.articleThumbnal);
    formData.append('UpdateThumbnail', this.article ? 'true' : 'false');
    const addEditEvent$ = this.article
      ? this._articleService.editArticle(this.articleId, formData)
      : this._articleService.addArticle(formData);
    this._subscription = addEditEvent$.subscribe(
      () => {
        this._router.navigate(['/make-dreams']);
        window.scrollTo({
          top: 0,
        });
        this.isSending = false;
        this.isLoading = false;
      },
      (err) => {
        window.scrollTo({
          top: 0,
        });
        this.isSending = false;
        this.isLoading = false;
      }
    );
  }

  public onEmojiSelect(emoji: any): void {
    this.form.controls.body.setValue(this.form.controls.body.value + emoji
    );
  }

  public clickOutsideEmoticons(): void {
    if (this.showEmoticons) {
      this.showEmoticons = false;
    }
  }

  private _getArticle(): void {
    this.isLoading = true;
    this._subscription = this._articleService
      .getArticle(this.articleId).pipe(mergeMap((article: IArticle) => {
        if (article.thumbnail) {
          return this._downloadService.downloadFileFromUrl(article.thumbnail.filePath).pipe(map((blob: Blob) => {
            article.thumbnailUrl = this._downloadService.getSafeUrlFromBlob(blob, true);
            return article;
          }));
        } else {
          return of(article);
        }
      }),
        tap(() => {
          this.isLoading = false;
        }))
      .subscribe((article: IArticle) => {
        this.article = article;
        if (this.article.thumbnailUrl) {
          this.thumbnailUrl = this.article.thumbnail.filePath;
        }
        this._setForm();
        this._cdr.detectChanges();
        article.thumbnail.type.includes("image") ? this.format = "image" : this.format = "video";
      });
  }

  private _setForm(): void {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setValue(this.article[key as keyof IArticle]);
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
