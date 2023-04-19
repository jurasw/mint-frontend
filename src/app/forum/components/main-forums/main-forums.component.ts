import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DEFAULT_PAGINATION } from 'src/app/_core/constants/pagination.constant';
import { IForum } from '../../models/forum.interface';
import { IImageForum } from '../../models/image-forum.interface';
import { ForumService } from '../../services/forum.service';
@Component({
  selector: 'app-main-forums',
  templateUrl: './main-forums.component.html',
  styleUrls: ['./main-forums.component.scss'],
})
export class MainForumsComponent implements OnInit, OnDestroy {
  public forums$ = new Observable<IForum[]>();
  public isLoading = false;
  public imageForum: IImageForum[] = [
    {
      forumId: 1,
      pictureUrl:
        '../../../../assets/images/forum-images/psychologiczne.png', 
    },
    {
      forumId: 2,
      pictureUrl:
        '../../../../assets/images/forum-images/wspieranie-innych.png',
    },
    {
      forumId: 3,
      pictureUrl:
        '../../../../assets/images/forum-images/spokojna-aktywnosc.png',
    },
    {
      forumId: 4,
      pictureUrl:
        '../../../../assets/images/forum-images/zycie-towarzyskie.png',
    },
    {
      forumId: 5,
      pictureUrl:
        '../../../../assets/images/forum-images/wiezi-rodzinne.png',
    },
    {
      forumId: 6,
      pictureUrl:
        '../../../../assets/images/forum-images/kultura-i-zainteresowanie.png',
    },
  ];
  constructor(private forumService: ForumService, private _router: Router) {}

  public ngOnInit(): void {
    this.getForums();
  }

  public getForums(): void {
    this.isLoading = true;
    this.forums$ = this.forumService.getAll().pipe(
      map((forums: IForum[]) =>
        forums.sort((a, b) => +b.isAttendee - +a.isAttendee)
      ),
      tap((res: IForum[]) => {
        const array: IImageForum[] = [];
        res.forEach((res) => {
          this.imageForum.forEach((image) => {
            if (image.forumId === res.id) {
              array.push(image);
            }
          });
        });
        this.imageForum = array;
        this.isLoading = false;
      }),
      catchError((err: HttpErrorResponse) => {
        this.isLoading = false;
        return throwError(err);
      })
    );
  }

  public joinToForum(forumId: number): void {
    this.forumService.join(forumId).subscribe(() => {
      this.getForums();
    });
  }

  public onLatestPostClick(result: IForum): void {
    const page = Math.ceil(
      result.latestPost.postRef / (DEFAULT_PAGINATION.limit || 1)
    );
    this._router.navigate(
      ['/forums/' + result.id + '/' + result.latestPost.forumThreadId],
      { queryParams: { post: result.latestPost.id, page } }
    );
  }

  public ngOnDestroy(): void {}
}
