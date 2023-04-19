import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { IAttachment } from 'src/app/forum/models/posts.interface';

@Component({
  selector: 'app-user-picture',
  templateUrl: './user-picture.component.html',
  styleUrls: ['./user-picture.component.scss'],
})
export class UserPictureComponent implements OnInit {
  @Input() public picture!: IAttachment | undefined;
  @Input() public pictureUrl!: SafeUrl | undefined;
  @Input() public isMain: boolean | undefined = false;
  @Input() public editable = true;
  @Input() public index!: number;
  @Output() public imageUploaded$: EventEmitter<{
    pictureId?: number;
    file: File;
  }> = new EventEmitter();
  @Output() public mainImageSet$: EventEmitter<IAttachment> =
    new EventEmitter();
  @Output() public imageDeleted$: EventEmitter<{ id: number; index: number }> =
    new EventEmitter();
  constructor() {}

  public ngOnInit(): void {}

  public setAsMainPicture(): void {
    this.mainImageSet$.emit(this.picture);
  }

  public deletePicture(): void {
    if (this.picture) {
      this.imageDeleted$.emit({ id: this.picture.id, index: this.index });
    }
  }

  public onInputFileChange(event: Event): void {
    if (event.target) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.imageUploaded$.emit({
          pictureId: this.picture ? this.picture.id : undefined,
          file: files[0],
        });
      }
    }
  }
}
