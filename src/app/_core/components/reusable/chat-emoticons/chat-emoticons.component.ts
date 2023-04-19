import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-chat-emoticons',
  templateUrl: './chat-emoticons.component.html',
  styleUrls: ['./chat-emoticons.component.scss'],
})
export class ChatEmoticonsComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2) {}
  @Output() public emojiSelect$: EventEmitter<any> = new EventEmitter();
  @ViewChild('emojis', { read: ElementRef }) public emojisElement!: ElementRef;
  public notSupportedEmojis = [
    'relaxed',
    'smiling_face_with_tear',
    'hook',
    'disguised_face',
    'pinched_fingers',
    'anatomical_heart',
    'lungs',
    'ninja',
    'people_hugging',
    'bison',
    'mammoth',
    'beaver',
    'dodo',
    'feather',
    'seal',
    'beetle',
    'cockroach',
    'fly',
    'worm',
    'potted_plant',
    'blueberries',
    'olive',
    'bell_pepper',
    'flatbread',
    'tamale',
    'fondue',
    'teapot',
    'bubble_tea',
    'magic_wand',
    'pinata',
    'nesting_dolls',
    'sewing_needle',
    'knot',
    'rock',
    'wood',
    'hut',
    'pickup_truck',
    'roller_skate',
    'thong_sandal',
    'military_helmet',
    'accordion',
    'long_drum',
    'coin',
    'boomerang',
    'carpentry_saw',
    'screwdriver',
    'ladder',
    'elevator',
    'mirror',
    'window',
    'plunger',
    'mouse_trap',
    'bucket',
    'toothbrush',
    'headstone',
    'placard',
  ];
  public isLoading = false;
  public ngAfterViewInit(): void {
    setTimeout(() => {
      const emojisElements: any = Array.from(
        this.emojisElement.nativeElement.querySelectorAll('.emoji-mart-emoji')
      );
      emojisElements
        .filter((emoji: any) => {
          let isSupported = true;
          this.notSupportedEmojis.forEach((e: any) => {
            if (emoji && emoji.getAttribute('aria-label') && emoji.getAttribute('aria-label').includes(e)) {
              isSupported = false;
            }
          });
          return !isSupported;
        })
        .forEach((emoji: any) =>
          this.renderer.setStyle(emoji, 'display', 'none')
        );
      this.isLoading = false;
    }, 0);
  }

  public ngOnInit(): void {
    this.isLoading = true;
  }

  public onEmojiSelect(event: any): void {
    this.emojiSelect$.next(event.emoji.native);
  }
}
