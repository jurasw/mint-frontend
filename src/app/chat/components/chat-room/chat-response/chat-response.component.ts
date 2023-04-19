import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IChatNewMessage } from 'src/app/chat/models/chat-message.interface';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-chat-response',
  templateUrl: './chat-response.component.html',
  styleUrls: ['./chat-response.component.scss'],
})
export class ChatResponseComponent implements OnInit {
  @ViewChild('emoticonButton') public emoticonButtonElement!: ElementRef;
  @ViewChild('file') public file!: ElementRef;
  @Input() public isBubble = false;
  @Input() public enableAttachments!: boolean;
  @Output() public messageSent$: EventEmitter<IChatNewMessage> =
    new EventEmitter();
  public showEmoticons = false;
  public form: FormGroup = new FormGroup({
    message: new FormControl('', {
      validators: [Validators.maxLength(5000)],
    }),
  });

  constructor(public authenticationService: AuthenticationService) {}

  public ngOnInit(): void {}

  public onEmojiSelect(emoji: any): void {
    this.form.controls.message.setValue(
      this.form.controls.message.value + emoji
    );
  }

  public clickOutsideEmoticons(): void {
    if (this.showEmoticons) {
      this.showEmoticons = false;
    }
  }

  public submit(): void {
    const files: FileList = this.file
      ? this.file.nativeElement.files
      : undefined;
    if (this.form.controls.message.value.length > 0) {
      this.messageSent$.next({
        message: this.form.controls.message.value,
        attachments: files,
      });
    }
    this.form.controls.message.setValue('');
  }
}
