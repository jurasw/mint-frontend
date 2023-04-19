import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from '../../../models/user.interface';
import { DownloadService } from '../../../services/download.service';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit, OnDestroy {
  @Input() public user!: IUser;
  @Input() public width = 5;
  @Input() public height = 5;
  @Input() public isRounded = true;
  private _subscription: Subscription = new Subscription();
  constructor(private _downloadService: DownloadService) { }

  public ngOnInit(): void {
    this.downloadRecipientImage();
  }

  public downloadRecipientImage(): void {
    if (this.user && this.user.profilePicture) {
      this._subscription = this._downloadService.downloadFileFromUrl(this.user.profilePicture.filePath).subscribe((blob: Blob) => {
        this.user.profilePictureUrl = this._downloadService.getSafeUrlFromBlob(blob, true);
      });
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
