import { Component, Input, OnInit } from '@angular/core';
import { IChatMessage } from 'src/app/chat/models/chat-message.interface';
import { IChatRoom } from 'src/app/chat/models/chat-room.interface';
import { IAttachment } from 'src/app/forum/models/posts.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { DownloadService } from 'src/app/_core/services/download.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  @Input() public room!: IChatRoom;
  @Input() public message!: IChatMessage;
  @Input() public ownMessage!: boolean;

  public isUserWorker = this._authService.isUserWorker;
  constructor(private _downloadService: DownloadService, private _authService: AuthenticationService) {}

  public ngOnInit(): void {}

  public downloadFile(file: IAttachment): void {
    this._downloadService
      .downloadFileFromUrl(file.filePath)
      .subscribe((data) => {
        const url = window.URL.createObjectURL(data);
        window.open(url);
      });
  }
}
