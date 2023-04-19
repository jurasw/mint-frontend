import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IAttachment } from 'src/app/forum/models/posts.interface';
import { IUser } from 'src/app/_core/models/user.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { DownloadService } from 'src/app/_core/services/download.service';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-user-pictures',
  templateUrl: './user-pictures.component.html',
  styleUrls: ['./user-pictures.component.scss'],
})
export class UserPicturesComponent implements OnInit, OnDestroy {
  @Input() public editable = true;
  @Input() public user!: IUser;
  public userPictureFiles: (SafeUrl | undefined)[] = [];
  public isLoading = false;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _userProfileService: UserProfileService,
    private _downloadService: DownloadService,
    private _authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this._getUserPictures();
  }

  public onImageUpload(event: { pictureId?: number; file: File }): void {
    const deleteImage$: Observable<any> | undefined = event.pictureId
      ? this._userProfileService.deletePicture(event.pictureId)
      : undefined;

    const formData = new FormData();
    formData.append('image', event.file);
    const addImage$: Observable<any> =
      this._userProfileService.setPicture(formData);
    if (deleteImage$) {
      this._subscription = deleteImage$
        .pipe(mergeMap(() => addImage$))
        .subscribe((file: IAttachment) => {
          this.user.profilesPictures = this.user.profilesPictures.filter(
            (picture) => picture.id !== event.pictureId
          );
          this.user = { ...this.user };
          this._addImage(file);
          window.location.reload();
        });
    } else {
      this._subscription = addImage$.subscribe((file: IAttachment) => {
        this._addImage(file);
      });
    }
  }

  public onImageDelete(data: { id: number; index: number }): void {
    this._subscription = this._userProfileService
      .deletePicture(data.id)
      .subscribe(() => {
        this.user.profilesPictures = this.user.profilesPictures.filter(
          (picture) => picture.id !== data.id
        );
        this.user = { ...this.user };
        this.userPictureFiles = this.userPictureFiles.filter(
          (file, index) => index !== data.index
        );
      });
  }

  public onMainImageSet(picture: IAttachment): void {
    this._subscription = this._userProfileService
      .setMainPicture(picture.id)
      .subscribe(() => {
        this.user.profilePicture = picture;
        this.user = { ...this.user };
      });
  }

  public generateImageUrl(files: any): void {
    this.isLoading = false;
    if (files.length > 0) {
      files.forEach((file: Blob) => {
        const imageUrl = this._downloadService.getSafeUrlFromBlob(file, true);
        this.userPictureFiles.push(imageUrl);
      });
    }
  }

  private _addImage(file: IAttachment): void {
    this.user.profilesPictures.push(file);
    this._downloadService
      .downloadFileFromUrl(file.filePath)
      .subscribe((blob: Blob) => {
        this.userPictureFiles.push(
          this._downloadService.getSafeUrlFromBlob(blob, true)
        );
      });
  }

  private downloadPictureFiles(
    userInfo: IUser,
    downloadsObs: Observable<Blob>[]
  ): void {
    userInfo.profilesPictures.forEach((picture: IAttachment) => {
      downloadsObs.push(
        this._downloadService.downloadFileFromUrl(picture.filePath)
      );
    });
  }

  private _getUserPictures(): void {
    this.isLoading = true;
    const downloads$: Observable<any>[] = [];
    this.userPictureFiles = [];
    if (!this.user && this._authenticationService.currentUser) {
      this._subscription = this._userProfileService
        .getAllUserData(+this._authenticationService.currentUser.id)
        .pipe(
          mergeMap((data: IUser) => {
            this.user = data;
            if (data.profilesPictures.length > 0) {
              this.downloadPictureFiles(data, downloads$);
              return forkJoin(downloads$);
            } else {
              return of([]);
            }
          })
        )
        .subscribe(
          (data) => {
            this.generateImageUrl(data);
          },
          (err) => {
            this.isLoading = false;
          }
        );
    } else {
      if (this.user.profilesPictures.length > 0) {
        this.downloadPictureFiles(this.user, downloads$);
        forkJoin(downloads$).subscribe(
          (files) => {
            this.generateImageUrl(files);
            this.isLoading = false;
          },
          (err) => {
            this.isLoading = false;
          }
        );
      } else {
        this.isLoading = false;
      }
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
